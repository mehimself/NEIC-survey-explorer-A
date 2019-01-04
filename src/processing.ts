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
let variablePixels = [];
let variableOffsets = [];
let squareSize = 5;
let bitmaps = [];

// todo: issue #12
function determineSquareSize () {
  let square = 1;
  squareSize = square;
}

function mapVariableOffsets() {
  let variableOffset = 0;
  for (let i = 0; i < config.cardinalities.length; i++) {
    variableOffsets.push(variableOffset);
    variableOffset = variableOffsets[i] + config.cardinalities[i];
  }
}

function mapVariablePixels() {
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
  function mapSet(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      for (let c = 0; c < cardinality; c++) {
        let pixel = {
          x: variablePixels[v][c].x,
          y: variablePixels[v][c].y,
          value: 0
        };
        pixel.value = getProportionalPixelValue(cardinality, value, c);
        map.push(pixel);
      }
    })
  }

  bitmaps = [];
  config.testData.forEach((set) => {
    let map = [];
    bitmaps.push(map);
    mapSet(set, map);
  });
}

function mapTestDataToPixels() {
  config.feeds.forEach((feed) => {
    feed.map = [];
    for (let idx = 0; idx < variablePixels.length; idx++) {
      const isActivePixel = feed.inputMask.indexOf(idx) >= 0;
      const pixelValue = isActivePixel ? 1 : 0; //1 - data.meanBitMap[idx].value; // todo: review this weighting
      for (let p = 0; p < config.cardinalities[idx]; p++) {
        let pixel = {
          x: variablePixels[idx][p].x,
          y: variablePixels[idx][p].y,
          value: pixelValue
        };
        feed.map.push(pixel);
      }
    }
  })
}

function mapPixelMasks() {
  function isPixelInOutput(x: number, y: number, pixels: any[]): boolean {
    let found = false;
    for (let c = 0; c < pixels.length; c++) { // variable pixel coordinates (c)
      let variablePixel = pixels[c];
      found = variablePixel.x === x + 1 && variablePixel.y === y + 1; // todo: stinks 0- and 1-based indexes
      if (found) break
    }
    return found;
  }

  config.feeds.forEach(feed => {
    feed.pixelMask = [];
    for (let y = 0; y < config.squareSize; y++) { // row (y)
      feed.pixelMask[y] = [];
      for (let x = 0; x < config.squareSize; x++) { // column (x)
        feed.pixelMask[y][x] = 0;
        for (let v = 0; v < feed.outputs.length; v++) {
          const variableIndex = feed.outputs[v];
          feed.pixelMask[y][x] = isPixelInOutput(x, y, config.variablePixels[variableIndex]) ? 1 : 0;
          if (feed.pixelMask[y][x] === 1) {
            break;
          }
        }
      }
    }
    // console.log(feed.label, feed.pixelMask)
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
  determineSquareSize();
  mapVariableOffsets();
  mapVariablePixels();
  unpackVariables();
  mapTestDataToPixels();
  mapPixelMasks();
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

export function getTrainingData(bitmaps: TwoD[][]):
  TwoD[] {
  let points: TwoD[] = [];
  // todo: issue #11
  for (let m = 0; m < bitmaps.length; m++) {
    for (let p = 0; p < bitmaps[m].length; p++) {
      points.push({
        x: bitmaps[m][p].x - 0.5,
        y: bitmaps[m][p].y + 0.5,
        value: bitmaps[m][p].value
      })
    }
  }
  return points;
}

export function getTestData(bitmaps: TwoD[][]):
  TwoD[] {
  // todo: issue #11
  let points: TwoD[] = [];
  for (let m = 0; m < bitmaps.length; m++) {
    for (let p = 0; p < bitmaps[m].length; p++) {
      points.push({
        x: bitmaps[m][p].x - 0.5,
        y: bitmaps[m][p].y + 0.5,
        value: bitmaps[m][p].value
      })
    }
  }
  return points;
}

