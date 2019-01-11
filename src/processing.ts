/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

// modified by Max Roald Eckardt mr.eckardt@gmail.com mehimself@github.com


import config from "./config";

const maxSquareSize = 100;
const variableCount = config.testData[0].length;
let variablePixels = [];
let variableOffsets = [];
let squareSize;

let trainBitmaps = [];
let testBitmaps = [];

let feedBitmaps = [];

// todo: issue #12
function determineSquareSize () {
  if (config.debug.names) console.log('processing.determineSquareSize');
  let size = 1;
  for (; size < maxSquareSize; size++) {
    if (Math.pow(size, 2) <= variableCount) break;
  }
  squareSize = size;
}

function mapVariableOffsets() {
  if (config.debug.names) console.log('processing.mapVariableOffsets');
  let variableOffset = 0;
  for (let i = 0; i < config.cardinalities.length; i++) {
    variableOffsets.push(variableOffset);
    variableOffset = variableOffsets[i] + config.cardinalities[i];
  }
}

function mapVariablePixels() {
  if (config.debug.names) console.log('processing.mapVariablePixels');
  config.cardinalities.forEach((cardinality, v) => {
    const variableOffset = variableOffsets[v];
    const pixels = [];
    for (let c = 0; c < cardinality; c++) {
      const pixelOffset = variableOffset + c;
      const coordinates = {
        x: pixelOffset % squareSize + 1,
        y: Math.floor(pixelOffset / squareSize) + 1
      };
      pixels.push(coordinates);
    }
    variablePixels.push(pixels);
  })
}

function unpackVariables() {
  if (config.debug.names) console.log('processing.unpackVariables');

  function generateBitMap(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      let pixelSet = []
      for (let c = 0; c < cardinality; c++) {
        let pixel = {
          x: variablePixels[v][c].x,
          y: variablePixels[v][c].y,
          value: 0
        };
        pixel.value = getProportionalPixelValue(cardinality, value, c);
        pixelSet.push(pixel);
      }
      map.push(pixelSet);
    })
  }

  config.trainData.forEach((set) => {
    let map = [];
    trainBitmaps.push(map);
    generateBitMap(set, map);
  });
  testBitmaps = [];
  config.testData.forEach((set) => {
    let map = [];
    testBitmaps.push(map);
    generateBitMap(set, map);
  });
}

function mapTestDataToPixels() {
  if (config.debug.names) console.log('processing.mapTestDataToPixels');
  config.feeds.forEach((feed, index) => {
    feedBitmaps[index] = [];
    for (let idx = 0; idx < variablePixels.length; idx++) {
      const isActivePixel = feed.variables.indexOf(idx) >= 0;
      const pixelValue = isActivePixel ? 1 : 0;
      for (let p = 0; p < config.cardinalities[idx]; p++) {
        let pixel = {
          x: variablePixels[idx][p].x,
          y: variablePixels[idx][p].y,
          value: pixelValue
        };
        feedBitmaps[index].push(pixel);
      }
    }
  })
}

function getProportionalPixelValue(cardinality, value, index) {
  const pixelValueProportion = 1 / cardinality;
  const valueThreshold = index * pixelValueProportion;
  let pixelValue = (value - valueThreshold) * cardinality;
  pixelValue = Math.round(pixelValue * 100) / 100;
  if (pixelValue < 0) {
    pixelValue = 0;
  }
  return pixelValue;
}

function initialize () {
  if (config.debug.names) console.log('processing.initialize');
  if (!config.trainData.length) {
    console.log('generating training data');
    generateTrainData();
  }
  determineSquareSize();
  mapVariableOffsets();
  mapVariablePixels();
  unpackVariables();
  mapTestDataToPixels();
}

initialize();

/**
 * A two dimensional example: x and y coordinates with the label.
 */
export type TwoD = {
  x: number,
  y: number,
  value: number
};

/**
 * Shuffles the array using Fisher-Yates algorithm. Uses the seedrandom
 * library as the random generator.
 */
export function shuffle(array: any[]): void {
  let counter = array.length;
  let temp = 0;
  let index = 0;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
}

// todo: issue #11
export type DataGenerator = (bitmaps: TwoD[][]) => TwoD[];

// todo: issue #11
/*
  functions to determine variable cardinality, squareSize, mapping input array to heatmap, generating pixelmap, ...
*/

function mapDataToPoints(sets: number[][]): TwoD[] {
  let array = []
  sets.forEach((set, setIndex) => {
    for (let x = 0; x < set.length; x++) {
      array.push({
        x,
        y: setIndex,
        value: set[x]
      });
    }
  });
  return array
}
function mapDataArrayToPoints(array: number[][]) {
  let points = [];
  let Ys = array.length;
  for (let y = 0; y < Ys; y++) {
    let Xs = array[y].length;
    for (let x = 0; x < Xs; x++) {
      let point = {
        x: x,
        y: y,
        value: array[y][x]
      };
      points.push(point)
    }
  }
  return points
}

export function getFeedPixelValue(feedIndex: number, y: number, x: number) {
  if (config.debug.names) console.log('processing.getFeedPixelValue');
  let pixels = feedBitmaps[feedIndex];
  let value = 0;
  for (let p = 0; p < pixels.length; p++) {
    const pixel = pixels[p];
    const sameRow = pixel.y - 1 <= y && y < pixel.y;
    const sameCol = pixel.x - 1 <= x && x < pixel.x;
    if (sameRow && sameCol) {
      value = pixel.value;
      break;
    }
  }
  return value;
}
export function generateTrainData(): TwoD[] {
  if (config.debug.names) console.log('processing.generateTrainData');
  let trainData = [];
  for (let x = 0; x < squareSize; x++) {
    for (let y = 0; y < squareSize; y++) {
      // todo: fix output
      let pixelIsActive = false;
      config.feeds.forEach(feed => {

        // see if pixel is active

      })
      trainData.push(
        // variable pixel values
      );
      trainBitmaps.push({
        x,
        y,
        value: pixelIsActive
      })
    }
  }
  return trainBitmaps;
}

export function getTrainData(): TwoD[] {
  if (config.debug.names) console.log('processing.getTrainData');
  let points: TwoD[] = [];
  // todo: issue #11
  for (let m = 0; m < trainBitmaps.length; m++) {
    points.push({
      x: trainBitmaps[m].x - 0.5,
      y: trainBitmaps[m].y + 0.5,
      value: trainBitmaps[m].value
    })
  }
  console.log('gettrainData', points);
  return points;
}

export function getTestData(): TwoD[] {
  if (config.debug.names) console.log('processing.getTestData');
  // todo: issue #11
  let points: TwoD[] = [];
  for (let m = 0; m < testBitmaps.length; m++) {
    for (let p = 0; p < testBitmaps[m].length; p++) {
      points.push({
        x: testBitmaps[m][p].x - 0.5,
        y: testBitmaps[m][p].y + 0.5,
        value: testBitmaps[m][p].value
      })
    }
  }
  return points;
}

export function getSquareSize() {
  if (config.debug.names) console.log('processing.getSquareSize');
  return squareSize;
}
