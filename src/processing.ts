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

import config from "./config";

let pixelCoordinates = [];

function mapMeanBitmap() {
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
  for (let idx = 0; idx < pixelCoordinates.length; idx++) {
    for (let p = 0; p < config.cardinalities[idx]; p++) {
      let pixel = {
        x: pixelCoordinates[idx][p].x,
        y: pixelCoordinates[idx][p].y,
        value: meanResponseSet[idx]
      };
      map.push(pixel);
    }
  }
  return map;
}

function mapFeeds() {
  config.feeds.forEach((feed) => {
    feed.map = [];
    for (let idx = 0; idx < pixelCoordinates.length; idx++) {
      const isActivePixel = feed.inputMask.indexOf(idx) >= 0;
      const pixelValue = isActivePixel ? 1 : 0; //1 - meanBitmap[idx].value; // todo: review this weighting
      for (let p = 0; p < config.cardinalities[idx]; p++) {
        let pixel = {
          x: pixelCoordinates[idx][p].x,
          y: pixelCoordinates[idx][p].y,
          value: pixelValue
        };
        feed.map.push(pixel);
      }
    }
  })
}

function getSquareSize() {
  let pixelCount = 0;
  for (let i = 0; i < config.cardinalities.length; i++) {
    pixelCount += config.cardinalities[i];
  }
  return Math.ceil(Math.sqrt(pixelCount))
}

function mapVariablePixels() {
  function mapVariableOffsets() {
    let variableOffset = 0;
    for (let i = 0; i < config.cardinalities.length; i++) {
      variableOffsets.push(variableOffset);
      variableOffset = variableOffsets[i] + config.cardinalities[i];
    }
  }

  let variableOffsets = [];

  mapVariableOffsets();

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
    pixelCoordinates.push(pixels);
  })
}

function mapTestBitmaps() {
  function getAbsolutePixelValue(cardinality, value, index) {
    const variableValue = Math.round(value * 100) / 100;
    let pixelValue = (1 + index) / cardinality;
    pixelValue = Math.round(pixelValue * 100) / 100;
    return pixelValue == variableValue ? 1 : 0;
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
  function mapSet(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      for (let c = 0; c < cardinality; c++) {
        let pixel = {
          x: pixelCoordinates[v][c].x,
          y: pixelCoordinates[v][c].y,
          value: 0
        };
        pixel.value = getProportionalPixelValue(cardinality, value, c);
        map.push(pixel);
      }
    })
  }
  let maps = [];
  config.packedVariableSets.forEach(set => {
    let map = [];
    maps.push(map);
    mapSet(set, map);
  });
  return maps;
}

function mapTrainBitmaps() {
  let maps = {};
  config.feeds.forEach(feed => { // => trainBitmaps
    let map = [];
    config.cardinalities.forEach((cardinality, variableIndex) => {
      map.push(feed.trainBias.indexOf(variableIndex) >= 0 ? 1 : -1);
    });
    maps[feed.label] = map;
  });
  return maps;
}

/**
 * A two dimensional example: x and y coordinates with the label.
 */
export type TwoD = {
  x: number,
  y: number,
  value: number
};

export const squareSize = getSquareSize();

mapVariablePixels();
mapFeeds();

export const meanBitmap = mapMeanBitmap();
export const testBitmaps = mapTestBitmaps();
export const trainBitmaps = mapTrainBitmaps();

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

export type DataGenerator = () => TwoD[];

export function getTestData():
  TwoD[] {
  let bitmaps = testBitmaps;
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

