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

