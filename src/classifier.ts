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

import * as d3 from 'd3';
import data from "./preprocessing";

/**
 * A two dimensional example: x and y coordinates with the label.
 */
export type Example2D = {
  x: number,
  y: number,
  label: number
};

export type Point = {
  x: number,
  y: number
};

export type DataGenerator = (numSamples: number, noise: number) => Example2D[];

export function classifySurveyData(numSamples: number, noise: number):
    Example2D[] {
    let points: Example2D[] = [];
    for (let m = 0; m < data.bitmaps.length; m++) {
        for (let p = 0; p < data.bitmaps[m].length; p++) {
            points.push({
                x: data.bitmaps[m][p].x - 0.5,
                y: data.bitmaps[m][p].y - 0.5,
                label: data.bitmaps[m][p].value
            })
        }
    }
    return points;
}

/**
 * Returns a sample from a uniform [a, b] distribution.
 * Uses the seedrandom library as the random generator.
 */
function randUniform(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

/**
 * Samples from a normal distribution. Uses the seedrandom library as the
 * random generator.
 *
 * @param mean The mean. Default is 0.
 * @param variance The variance. Default is 1.
 */
function normalRandom(mean = 0, variance = 1): number {
  let v1: number, v2: number, s: number;
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while (s > 1);

  let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}

/** Returns the eucledian distance between two points in space. */
function dist(a: Point, b: Point): number {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
