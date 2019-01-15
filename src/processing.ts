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

let variableCount = config.cardinalities.length;
let trainData = [];

let feedBitmaps = {};

export const squareSize = getSquareSize();
export const variablePixels = mapVariablePixels();

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

function mapFeedBitmaps() {
  config.feeds.forEach((feed) => {
    feed.map = [];
    feedBitmaps[feed.label] = [];
    for (let v = 0; v < variablePixels.length; v++) {
      const isActivePixel = feed.inputMask.indexOf(v) >= 0;
      const pixelValue = isActivePixel ? 1 : 0; // todo: set pixel training weighting
      for (let p = 0; p < config.cardinalities[v]; p++) {
        let pixel = {
          x: variablePixels[v][p].x,
          y: variablePixels[v][p].y,
          value: pixelValue
        };
        feedBitmaps[feed.label].push(pixel);
        feed.map.push(pixel);
      }
    }
  });
  console.log('feedBitmaps', feedBitmaps);
}

function getSquareSize() {
  let pixelCount = 0;
  for (let i = 0; i < variableCount; i++) {
    pixelCount += config.cardinalities[i];
  }
  return Math.ceil(Math.sqrt(pixelCount))
}

function mapVariablePixels() {
  function mapVariableOffsets() {
    let variableOffset = 0;
    for (let i = 0; i < variableCount; i++) {
      variableOffsets.push(variableOffset);
      variableOffset = variableOffsets[i] + config.cardinalities[i];
    }
  }

  let variableOffsets = [];

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
    return pixelValue ? 1: 0; // todo: set bias values
  }


  function mapVariableValueToPixelValues(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      for (let c = 0; c < cardinality; c++) {
        if (!variablePixels[v]) console.log('undefined', v, c);
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
  let maps = [];
  sets.forEach(set => {
    let map = [];
    maps.push(map);
    mapVariableValueToPixelValues(set, map);
  });
  return maps;
}

function expandFeedTrainBias(): number[][] {
  let sets = [];
  config.feeds.forEach(feed => {
    let set = [];
    config.cardinalities.forEach((cardinality, variableIndex) => {
      set.push(feed.trainBias.indexOf(variableIndex) >= 0 ? 1 : -1);
    });
    sets.push(set);
  });
  console.log('trainData', sets);
  return sets;
}

/**
 * A two dimensional example: x and y coordinates with the label.
 */
export type TwoD = {
  x: number,
  y: number,
  value: number
};

mapFeedBitmaps();

trainData = expandFeedTrainBias();
const trainBitmaps = mapSetValuesToPixels(trainData);
console.log('trainBitmaps', trainBitmaps);

export const meanBitmap = mapMeanBitmap();

const testBitmaps = mapSetValuesToPixels(config.packedVariableSets);

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

export function getTestData(): TwoD[] {
  let bitmaps = testBitmaps;
  let points: TwoD[] = [];
  for (let m = 0; m < bitmaps.length; m++) { // todo: make loops more descriptive
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

export function getTrainData(activeFeedLabels: string[], setSize: number = 20): TwoD[] {
  let points = [];
  for(let y = 0; y < squareSize; y++) { // iterate through each pixel row
    for (let x = 0; x < squareSize; x++) { // iterate through each pixel
      let combinedValue = false;
      activeFeedLabels.forEach(label => { // boolean OR current pixel values of active feeds
        let feedIndex = 0;
        config.feeds.forEach((feed, index) => { // find feed by label
          if (feed.label == label) {
            feedIndex = index;
          }
        });
        let feedPixel = trainBitmaps[feedIndex].find(pixel => pixel.y == y && pixel.x == x); // find same pixel in feed trainBias
        let feedPixelValue = feedPixel && feedPixel.value == 1;
        combinedValue = combinedValue || feedPixelValue;
      });
      let n = 0;
      do { // append training points [setSize] times
        points.push({
          y: y - 0.5,
          x: x + 0.5,
          value: combinedValue ? 1 : -1
        });
        n++;
      } while(n < setSize);
    }
  }
  return points;
}
