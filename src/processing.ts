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

// modified by Max R. Eckardt (mr.eckardt@gmail.com)


// general work flow: expand into sets of variable values (number[][]) > export as bitmap: TwoD[]


import config from "./config";

const pixelRowOffset = 0//0.5;
const pixelColumnOffset = 0//-0.5;

// number of variables in data

const variableCount = config.cardinalities.length;

if (config.debug.processing) console.log('variableCount', variableCount);

// pixel square side length
function getSquareSize() {
  let pixelCount = 0;
  for (let i = 0; i < variableCount; i++) {
    pixelCount += config.cardinalities[i];
  }
  return Math.ceil(Math.sqrt(pixelCount))
}

export const squareSize = getSquareSize();

if (config.debug.processing) console.log('squareSize', squareSize);

// variable pixel map

function mapVariablePixels() {
  function mapVariableOffsets() {
    let variableOffset = 0;
    for (let i = 0; i < variableCount; i++) {
      variableOffsets.push(variableOffset);
      variableOffset = variableOffsets[i] + config.cardinalities[i];
    }
  }

  let variableOffsets = [];
  if (config.debug.processing) console.log('variableOffsets', variableOffsets);

  mapVariableOffsets();

  let variablePixels = [];

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
  });
  return variablePixels;
}

export const variablePixels = mapVariablePixels();

if (config.debug.processing) console.log('variablePixels', variablePixels);

// map value[][] to TwoD[]

function mapSetValuesToPixels(sets: number [][]) {
  function getAbsolutePixelValue(cardinality, value, index) {
    const variableValue = Math.round(value * 100) / 100;
    let pixelValue = (1 + index) / cardinality;
    pixelValue = Math.round(pixelValue * 100) / 100;
    return pixelValue == variableValue ? 1 : 0;
  }

  function getProportionalPixelValue(cardinality, value, index) {
    const pixelValueProportion = 1 / cardinality;
    const pixelValue = value / cardinality >= pixelValueProportion * (index + 1);
    return pixelValue ? 1 : 0; // todo: set bias range here
  }

  function mapVariableValueToPixelValues(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      for (let c = 0; c < cardinality; c++) {
        if (!variablePixels[v]) console.log('undefined', v, c);
        let pixel = {
          x: variablePixels[v][c].x,
          y: variablePixels[v][c].y,
          value: getProportionalPixelValue(cardinality, value, c)
        };
        map.push(pixel);
      }
    })
  }

  let maps = [];
  sets.forEach(set => {
    let map = [];
    maps.push(map);
    mapVariableValueToPixelValues(set, map);
  });
  return maps;
}

// mean value bitmap
function mapMeanBitmap(): TwoD[] {
  function mapResultsMean() {
    let set = [];
    config.packedVariableSets[0].forEach((v, i) => {
      let sum = 0;
      config.packedVariableSets.forEach(set => sum += set[i]);
      set[i] = sum / config.packedVariableSets.length;
    });
    return set;
  }

  let meanResponseSet = mapResultsMean();
  let map = [];
  for (let v = 0; v < variablePixels.length; v++) {
    for (let p = 0; p < config.cardinalities[v]; p++) {
      let pixel = {
        x: variablePixels[v][p].x,
        y: variablePixels[v][p].y,
        value: meanResponseSet[v]
      };
      map.push(pixel);
    }
  }
  return map;
}

export const meanBitmap = mapMeanBitmap();

if (config.debug.processing) console.log('meanBitmap', meanBitmap);

// test data
function getTestData(): TwoD[] {
  let bitmaps = testBitmaps;
  let points: TwoD[] = [];
  for (let s = 0; s < bitmaps.length; s++) { // for each set
    for (let p = 0; p < bitmaps[s].length; p++) { // for each pixel
      points.push({
        y: bitmaps[s][p].y + pixelRowOffset,
        x: bitmaps[s][p].x + pixelColumnOffset,
        value: bitmaps[s][p].value
      })
    }
  }
  return points;
}
const testBitmaps = mapSetValuesToPixels(config.packedVariableSets);

export const testData = getTestData();

if (config.debug.processing) console.log('testData', testData);

// train data
// todo: issue #8
function expandFeedTrainBias(): number[][] {
  let sets = [];
  for (let label in config.feeds) {
    let feed = config.feeds[label];
    let set = [];
    config.cardinalities.forEach((cardinality, variableIndex) => {
      set.push(feed.trainBias.indexOf(variableIndex) >= 0 ? 1 : -1);
    });
    sets.push(set);
  }
  return sets;
}

const trainData = expandFeedTrainBias();
const trainBitmaps = mapSetValuesToPixels(trainData);

export function getTrainData(activeFeedLabels: string[], setSize: number = 0): TwoD[] {
  let points = [];
  for(let y = 0; y < squareSize; y++) { // iterate through each pixel row
    for (let x = 0; x < squareSize; x++) { // iterate through each pixel
      let combinedValue = false;
      activeFeedLabels.forEach(label => { // boolean OR current pixel values of active feeds
        let feedIndex = label.toUpperCase().charCodeAt(0) - 65;
        let feedPixel = trainBitmaps[feedIndex].find(pixel => pixel.y == y && pixel.x == x); // find same pixel in feed trainBias
        let feedPixelValue = feedPixel && feedPixel.value == 1;
        combinedValue = combinedValue || feedPixelValue;
      });
      let n = 0;
      do { // append training points [setSize] times
        points.push({
          y: y + pixelRowOffset,
          x: x + pixelColumnOffset,
          // todo: issue #8 - test data bias with combined bit weighting
          // renders all variable pixels either active
          value: combinedValue ? 1 : -1
        });
        n++;
      } while(n < setSize);
    }
  }
  return points;
}

// feature feed
function mapFeedBitmaps() {
  let feedBitmaps = {};
  for (let label in config.feeds) {
    let feed = config.feeds[label];
    feedBitmaps[label] = [];
    for (let v = 0; v < variablePixels.length; v++) {
      const isActivePixel = feed.inputMask.indexOf(v) >= 0;
      // todo: issue #8 - discrete input mask
      const pixelValue = isActivePixel ? 1 : 0; // todo: set pixel feed weighting here
      for (let p = 0; p < config.cardinalities[v]; p++) {
        let pixel = {
          y: variablePixels[v][p].y + pixelRowOffset,
          x: variablePixels[v][p].x + pixelColumnOffset,
          value: pixelValue
        };
        feedBitmaps[label].push(pixel);
      }
    }
  }
  return feedBitmaps;
}

export const feedBitmaps = mapFeedBitmaps();

export function getFeedPixelValue(label: any, x: number, y: number) {
  let value = 0;
  // todo: issue #8 -> bias * meanMap input source

  for (let p = 0; p < feedBitmaps[label].length; p++) {
    const pixel = feedBitmaps[label][p];
    const sameRow = pixel.y - 1 <= y && y < pixel.y;
    const sameCol = pixel.x - 1 <= x && x < pixel.x;
    if (sameRow && sameCol) {
      value = pixel.value;
      break;
    }
  }
  return value;
}

if (config.debug.processing) console.log('feedBitmaps', feedBitmaps);

// Fisher-Yates
export function shuffle(array: any[]): void {
  /**
   * Shuffles the array using Fisher-Yates algorithm. Uses the seedrandom
   * library as the random generator.
   */

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

export type TwoD = {
  x: number,
  y: number,
  value: number
};

