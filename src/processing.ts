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

import config from "./config";


function mapResultsMean() {
  config.packedVariableSets[0].forEach((v, i) => {
    let sum = 0;
    config.packedVariableSets.forEach(set => sum += set[i]);
    config.meanResponseSet[i] = sum / config.packedVariableSets.length;
  });
}

function mapMeanResponseSet() {
  config.meanBitMap = [];
  for (let idx = 0; idx < config.pixelCoordinates.length; idx++) {
    for (let p = 0; p < config.cardinalities[idx]; p++) {
      let pixel = {
        x: config.pixelCoordinates[idx][p].x,
        y: config.pixelCoordinates[idx][p].y,
        value: config.meanResponseSet[idx]
      };
      config.meanBitMap.push(pixel);
    }
  }
}

function mapResearchQuestions() {
  config.feeds.forEach((feed) => {
    feed.map = [];
    for (let idx = 0; idx < config.pixelCoordinates.length; idx++) {
      const isActivePixel = feed.inputMask.indexOf(idx) >= 0;
      const pixelValue = isActivePixel ? 1 : 0; //1 - config.meanBitMap[idx].value; // todo: review this weighting
      for (let p = 0; p < config.cardinalities[idx]; p++) {
        let pixel = {
          x: config.pixelCoordinates[idx][p].x,
          y: config.pixelCoordinates[idx][p].y,
          value: pixelValue
        };
        feed.map.push(pixel);
      }
    }
  })
}

function mapVariablePixels() {
  config.cardinalities.forEach((cardinality, v) => {
    const variableOffset = config.variableOffsets[v];
    const pixels = [];
    for (let c = 0; c < cardinality; c++) {
      const pixelOffset = variableOffset + c;
      const coordinates = {
        x: pixelOffset % config.squareSize + 1,
        y: Math.floor(pixelOffset / config.squareSize) + 1
      };
      pixels.push(coordinates);
    }
    config.pixelCoordinates.push(pixels);
  })
}

function mapVariableOffsets() {
  let variableOffset = 0;
  for (let i = 0; i < config.cardinalities.length; i++) {
    config.variableOffsets.push(variableOffset);
    variableOffset = config.variableOffsets[i] + config.cardinalities[i];
  }
}

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

function unpackVariables() {
  function mapSet(set, map) {
    set.forEach((value, v) => {
      const cardinality = config.cardinalities[v];
      const isUnpackable = [2, 5].indexOf(cardinality) >= 0;
      const isQualitativeValue = !isUnpackable;
      for (let c = 0; c < cardinality; c++) {
        let pixel = {
          x: config.pixelCoordinates[v][c].x,
          y: config.pixelCoordinates[v][c].y,
          value: 0
        };
        if (isUnpackable) {
          pixel.value = getProportionalPixelValue(cardinality, value, c);
        } else if (isQualitativeValue) {
          pixel.value = getProportionalPixelValue(cardinality, value, c); //getAbsolutePixelValue(cardinality, value, c);
        }
        map.push(pixel);
      }
    })
  }

  config.bitmaps = [];
  config.packedVariableSets.forEach((set) => {
    let map = [];
    config.bitmaps.push(map);
    mapSet(set, map);
  });
}

mapVariableOffsets();
mapVariablePixels();
unpackVariables();
mapResultsMean();
mapMeanResponseSet();
mapResearchQuestions();

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

export type DataGenerator = (bitmaps: TwoD[][]) => TwoD[];

export function classifySurveyData(bitmaps: TwoD[][]):
  TwoD[] {
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

