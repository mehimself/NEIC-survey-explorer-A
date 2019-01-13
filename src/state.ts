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

import * as nn from "./nn";

/** A map between names and activation functions. */
export let activations: {[key: string]: nn.ActivationFunction} = {
  "relu": nn.Activations.RELU,
  "tanh": nn.Activations.TANH,
  "sigmoid": nn.Activations.SIGMOID,
  "linear": nn.Activations.LINEAR
};

/** A map between names and regularization functions. */
export let regularizations: {[key: string]: nn.RegularizationFunction} = {
  "none": null,
  "L1": nn.RegularizationFunction.L1,
  "L2": nn.RegularizationFunction.L2
};

export function getKeyFromValue(obj: any, value: any): string {
  for (let key in obj) {
    if (obj[key] === value) {
      return key;
    }
  }
  return undefined;
}

/**
 * The config type of a state variable. Used for determining the
 * (de)serialization method.
 */
export enum Type {
  STRING,
  NUMBER,
  ARRAY_NUMBER,
  ARRAY_STRING,
  BOOLEAN,
  OBJECT
}

export enum Problem {
  CLASSIFICATION
}

export let problems = {
  "classification": Problem.CLASSIFICATION
};
export let colorRange = {
  colors: ["#f59322", "#ffffff", "#0877bd"],
  range: [-1, 0, 1]
};
export interface Property {
  name: string;
  type: Type;
  keyMap?: {[key: string]: any};
}

// Add the GUI state.
export class State {

  private static PROPS: Property[] = [
    {name: "activation", type: Type.OBJECT, keyMap: activations},
    {name: "regularization", type: Type.OBJECT, keyMap: regularizations},
    {name: "batchSize", type: Type.NUMBER},
    {name: "learningRate", type: Type.NUMBER},
    {name: "regularizationRate", type: Type.NUMBER},
    {name: "noise", type: Type.NUMBER},
    {name: "networkShape", type: Type.ARRAY_NUMBER},
    {name: "seed", type: Type.STRING},
    {name: "showTestData", type: Type.BOOLEAN},
    {name: "discretize", type: Type.BOOLEAN},
    // todo: add survey seed variable names here (for serializing it in the url)
    {name: "A", type: Type.BOOLEAN},
    {name: "B", type: Type.BOOLEAN},
    {name: "C", type: Type.BOOLEAN},
    {name: "D", type: Type.BOOLEAN},
    {name: "E", type: Type.BOOLEAN},
    {name: "collectStats", type: Type.BOOLEAN},
    {name: "tutorial", type: Type.STRING},
    {name: "problem", type: Type.OBJECT, keyMap: problems},
    {name: "initZero", type: Type.BOOLEAN},
    {name: "hideText", type: Type.BOOLEAN},
  ];

  [key: string]: any;
  learningRate = 0.001;
  regularizationRate = 0.001;
  // todo: toggle test config visibility here
  showTestData = false;
  noise = 20;
  batchSize = 10;
  discretize = false;
  tutorial: string = null;
  activation = nn.Activations.TANH;
  regularization: nn.RegularizationFunction = nn.RegularizationFunction.L2;
  problem = Problem.CLASSIFICATION;
  initZero = false;
  hideText = false;
  collectStats = false;
  numHiddenLayers = 1;
  networkShape: number[] = [4];
  // todo: set survey seed variable initial state here
  A = true;
  B = false;
  C = false;
  D = false;
  E = false;
  seed: string;

  /**
   * Deserializes the state from the url hash.
   */
  static deserializeState(): State {
    let map: {[key: string]: string} = {};
    for (let keyvalue of window.location.hash.slice(1).split("&")) {
      let [name, value] = keyvalue.split("=");
      map[name] = value;
    }
    let state = new State();

    function hasKey(name: string): boolean {
      return name in map && map[name] != null && map[name].trim() !== "";
    }

    function parseArray(value: string): string[] {
      return value.trim() === "" ? [] : value.split(",");
    }

    // Deserialize regular properties.
    State.PROPS.forEach(({name, type, keyMap}) => {
      switch (type) {
        case Type.OBJECT:
          if (keyMap == null) {
            throw Error("A key-value map must be provided for state " +
                "variables of type Object");
          }
          if (hasKey(name) && map[name] in keyMap) {
            state[name] = keyMap[map[name]];
          }
          break;
        case Type.NUMBER:
          if (hasKey(name)) {
            // The + operator is for converting a string to a number.
            state[name] = +map[name];
          }
          break;
        case Type.STRING:
          if (hasKey(name)) {
            state[name] = map[name];
          }
          break;
        case Type.BOOLEAN:
          if (hasKey(name)) {
            state[name] = (map[name] === "false" ? false : true);
          }
          break;
        case Type.ARRAY_NUMBER:
          if (name in map) {
            state[name] = parseArray(map[name]).map(Number);
          }
          break;
        case Type.ARRAY_STRING:
          if (name in map) {
            state[name] = parseArray(map[name]);
          }
          break;
        default:
          throw Error("Encountered an unknown type for a state variable");
      }
    });

    // Deserialize state properties that correspond to hiding UI controls.
    if (state.seed == null) {
      state.seed = Math.random().toFixed(5);
    }
    Math.seedrandom(state.seed);
    return state;
  }

  /**
   * Serializes the state into the url hash.
   */
  serialize() {
    // Serialize regular properties.
    let props: string[] = [];
    State.PROPS.forEach(({name, type, keyMap}) => {
      let value = this[name];
      // Don't serialize missing values.
      if (value == null) {
        return;
      }
      if (type === Type.OBJECT) {
        value = getKeyFromValue(keyMap, value);
      } else if (type === Type.ARRAY_NUMBER ||
          type === Type.ARRAY_STRING) {
        value = value.join(",");
      }
      props.push(`${name}=${value}`);
    });
    window.location.hash = props.join("&");
  }
}
