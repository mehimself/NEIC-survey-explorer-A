let data = {
    headers: ['Organization', 'Practices addressing ethical challenges', 'Practice supporting communication/publication', 'Share resources (which)', 'CD at MA-level', 'Part of Curriculum', 'General/specialized', 'Other', 'DRM part of existing or separate course', 'Developed own material', 'Who developed it', 'Willingness to share course material', 'Support for DM', 'Online DH training', 'Awareness of following initiative ', 'Willingness to collaborate on resources', 'CD: EDA', 'CD: Statistics', 'CD: Ethics', 'CD: Data rights and protection', 'CD: Interdisciplinary dialogue', 'Interest in HPC', 'Course integrated/separate', 'DRM – Department', 'DRM – Faculty'],
    cardinalities:      [5, 2, 3, 5, 2, 2, 2, 2, 2, 2, 4, 4, 11, 5, 6, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5],
    testSet:            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    contrastSets: [
        {
            name: 'Bland',
            set: [0.3, 1, 2, 0, 1, 0, 1, 0, 1, 0, 2, 2, 5, 1, 4, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
            map: []
        },
        {
            name: 'Nightmare',
            set: [0.2, 0, 1, 0.2, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0.2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0.2],
            map: []
        },
        {
            name: 'YesWeCan',
            set: [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            map: []
        }
    ],
    packedVariableSets: [
      [0, -1, 0, -0.5, -1, -1, 1, -1, -1, 1, -0.33333333333333337, 1, -0.4, 1, 0.19999999999999996, -1, -1, -1, -1, -1, -1, 1, -1, -0.39274254380873475, -0.11071002890982251],
      [0, -1, -1, 0.5, 1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, -1, 1, -1, 1, -1, -0.8103938030698714, 0.01655631227780585],
      [0, -1, -1, -1, 1, 1, -1, -1, 1, -1, -1, 0.33333333333333326, 0.19999999999999996, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -0.814470039899416, -0.6893681203345747],
      [0, -1, -1, 1, -1, 1, 1, -1, 1, -1, -0.33333333333333337, 1, -0.8, 0, -1, 1, 1, -1, -1, -1, 1, 1, -1, -0.8144700398994156, 0.08293925877632535],
      [0, -1, -1, 0, 1, 1, 1, -1, 1, 1, 0.33333333333333326, -0.33333333333333337, -0.19999999999999996, 0.5, 1, 1, -1, 1, -1, 1, 1, -1, -1, -0.7685025611177659, 0.3158764787359285],
      [0, -1, -1, -1, 1, 1, 1, -1, 1, -1, 0.33333333333333326, 0.33333333333333326, 0.6000000000000001, 0, 0.19999999999999996, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1],
      [0, -1, -1, 0, 1, 1, 1, 1, -1, 1, -0.33333333333333337, 0.33333333333333326, 0.3999999999999999, 0, -1, 1, 1, -1, 1, 1, 1, -1, -1, -0.1410264253331035, 0.387948089621299],
      [0, -1, 0, 0, -1, 1, -1, 1, -1, -1, -0.33333333333333337, 0.33333333333333326, 0.8, 0, -0.19999999999999996, 1, -1, 1, 1, -1, -1, 1, -1, -0.4346337857608401, 0.542243435449306],
      [0, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, 0.6000000000000001, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [0, -1, 0, 0, -1, 1, 1, -1, 1, 1, -0.33333333333333337, -0.33333333333333337, 0.6000000000000001, -1, 0.6000000000000001, 1, -1, 1, -1, -1, 1, -1, 1, 0.12098419734790355, 0.006446365452372094],
      [0, -1, -1, -0.5, -1, 1, -1, 1, 1, 1, 0.33333333333333326, -1, 0, -1, -0.19999999999999996, 1, -1, -1, 1, 1, -1, 1, -1, -0.20144172500244018, -0.5451666163363791],
      [0, -1, 0, 1, -1, 1, 1, -1, 1, -1, -1, -0.33333333333333337, -0.4, 0, -0.6, 1, -1, -1, -1, -1, -1, -1, -1, -0.13034930731085625, -0.40949444224898823],
      [0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 0.6000000000000001, 0.5, 0.6000000000000001, 1, -1, 1, -1, -1, -1, -1, -1, -0.44507016467223237, -0.4723373043854876],
      [0, -1, -1, -0.5, -1, 1, -1, -1, 1, 1, 1, 0.33333333333333326, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -0.5370051222355319, 0.0406139904674645],
      [-1, -1, -1, -1, 1, 1, -1, 1, -1, -1, 0.33333333333333326, -0.33333333333333337, 1, -1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 0.40135688054240903, -0.013033127712506976],
      [-1, -1, 0, 0, -1, -1, 1, 1, -1, -1, 1, 1, 0.3999999999999999, -1, 0.19999999999999996, 1, -1, 1, -1, 1, 1, -1, -1, -0.3188842352925455, -0.9348027148877276],
      [0, -1, 0, 0, -1, 1, -1, -1, 1, -1, 1, 0.33333333333333326, 0.6000000000000001, 0.5, 0.19999999999999996, 1, 1, 1, -1, -1, -1, -1, -1, -0.8103938030698714, -0.7051506265512375],
      [1, -1, -1, -0.5, 1, 1, -1, 1, 1, 1, -0.33333333333333337, -0.33333333333333337, 0, -1, -0.6, 1, 1, 1, -1, -1, -1, 1, -1, -0.6289400797988315, 0.17100856069200954],
      [1, -1, -1, 0, -1, 1, -1, 1, -1, 1, -0.33333333333333337, -0.33333333333333337, 0.3999999999999999, 0.5, 1, 1, 1, -1, -1, -1, 1, -1, -1, -0.5054854643415692, 0.22753571830290342],
      [1, -1, -1, 0, -1, 1, 1, -1, 1, 1, 1, -0.33333333333333337, 0.6000000000000001, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -0.4589287021837818, -0.3933330854995648],
      [1, 1, -1, 0.5, -1, 1, 1, -1, 1, -1, -1, 1, 0.8, -1, 0.19999999999999996, 1, 1, 1, 1, 1, -1, -1, 1, -0.3567640352683561, 0.2217557668962551],
      [0, -1, 0, 1, -1, 1, 1, 1, -1, -1, 0.33333333333333326, 0.33333333333333326, 0.6000000000000001, 1, 0.19999999999999996, -1, 1, -1, -1, -1, 1, -1, -1, -0.494808346319322, -0.5755298623878358],
      [-0.5, 1, 0, -0.5, 1, 1, 1, -1, 1, 1, -1, -0.33333333333333337, -1, 0.5, 1, 1, -1, -1, -1, -1, 1, 1, 1, 0.303061780897262, 0.4587684235540237],
      [-1, -1, 0, -1, -1, 1, 1, 1, 1, 1, 0.33333333333333326, -0.33333333333333337, 0.6000000000000001, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -0.6757375810674737, 0.026163911559437425],
      [-0.5, 1, 0, 0.5, -1, 1, -1, -1, 1, 1, 0.33333333333333326, -0.33333333333333337, 1, -1, -0.6, 1, -1, 1, -1, -1, -1, -1, -1, -0.9289075823084161, 0.3575353329990658],
      [-1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, 0.33333333333333326, -1, 0.5, -0.19999999999999996, 1, -1, -1, -1, -1, -1, -1, 1, 0.10290588624643804, 0.5528891353936971],
      [0.5, 1, 0, -0.5, 1, 1, 1, 1, 1, 1, 1, -1, -0.6, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, 0.303061780897262, -0.6023369190816499],
      [-1, 1, 0, -1, 1, 1, 1, 1, -1, -1, -0.33333333333333337, 1, -0.8, 0.5, -0.6, 1, 1, 1, 1, 1, 1, -1, 1, 0.26155315276202784, 0.15917719936137176],
      [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 0.33333333333333326, -0.4, 0.5, 1, 1, -1, -1, 1, -1, -1, -1, 1, -0.2807653582602352, 0.0007738060611433006],
      [-1, 1, 0, 0.5, -1, -1, 1, -1, 1, -1, 1, -1, -0.4, 0, 1, 1, -1, 1, -1, -1, -1, 1, 1, -0.07401024447106375, -0.281454295000216],
      [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 0.33333333333333326, -1, 0.6000000000000001, 0, 0.6000000000000001, 1, -1, 1, -1, 1, -1, -1, -1, 0.7533665924491031, -0.20862498304932464],
      [-1, -1, 0, -1, 1, -1, 1, -1, -1, -1, 0.33333333333333326, -0.33333333333333337, 1, 0, 1, 1, 1, 1, -1, 1, -1, -1, 1, -0.3301852135931109, 0.38107376384820113],
      [1, -1, 0, -0.5, -1, 1, -1, 1, 1, -1, -1, -0.33333333333333337, 0.6000000000000001, 0, 0.6000000000000001, -1, 1, 1, 1, -1, 1, -1, 1, -0.5974204219048689, 0.14813654388859798],
      [-1, 1, -1, 0, 1, -1, -1, 1, 1, 1, 0.33333333333333326, -1, 0.6000000000000001, 0.5, -0.19999999999999996, -1, 1, 1, 1, -1, -1, -1, 1, 0.07861096982349669, 0.46165859964875366],
      [-1, -1, 0, -0.5, -1, 1, 1, -1, 1, -1, -1, -1, 0.19999999999999996, 0, 0.6000000000000001, 1, 1, 1, -1, 1, -1, 1, 1, -0.31995550424098496, 0.15655848178398268],
      [-0.5, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 0.33333333333333326, -0.4, 0.5, 1, 1, -1, 1, -1, 1, 1, -1, -1, 1, 1],
      [1, -1, -1, 0, -1, -1, 1, -1, -1, -1, -1, 1, -0.8, -1, -0.19999999999999996, -1, -1, 1, 1, -1, -1, 1, -1, -0.6959562606608709, 0.8289584345156473],
      [-0.5, -1, 0, 1, -1, 1, 1, -1, 1, -1, 0.33333333333333326, 0.33333333333333326, 0.6000000000000001, 0, -0.6, 1, 1, -1, -1, -1, -1, 1, -1, -0.49549649410029795, -0.9348027148877276],
      [-0.5, -1, -1, -1, -1, 1, -1, -1, -1, 1, -0.33333333333333337, -0.33333333333333337, -1, 0.5, 1, 1, 1, 1, -1, 1, -1, -1, -1, -0.7225350823361163, -0.5471421887793918],
      [-0.5, -1, -1, 0.5, -1, 1, 1, -1, 1, -1, 0.33333333333333326, 0.33333333333333326, 0.8, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 0.3237278691607799, 0.026163911559437425],
      [1, -1, 0, 0.5, -1, 1, 1, -1, -1, 1, 1, 0.33333333333333326, 0.8, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 0.8375964850234348, 0.2869530520085277],
      [-1, -1, 0, 0, -1, 1, 1, -1, -1, 1, -1, -0.33333333333333337, 0.8, -1, 0.6000000000000001, 1, -1, 1, -1, -1, -1, -1, -1, 0.28153109324457026, 0.15655848178398268],
      [-1, -1, 0, -1, -1, 1, 1, 1, 1, 1, -1, 1, 0.19999999999999996, -1, -0.19999999999999996, -1, -1, -1, -1, -1, -1, -1, -1, -0.27630650761381925, 0.49927502200606844],
      [1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -0.33333333333333337, 0.8, 0, 1, -1, -1, 1, -1, -1, -1, -1, -1, -0.267324011467738, 0.3515173286502309],
      [-0.5, 1, 0, 0, 1, 1, -1, -1, 1, 1, -0.33333333333333337, 0.33333333333333326, -0.19999999999999996, -0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, -0.265452937983375, -0.16973240708706383],
      [1, 1, 0, 0, 1, 1, 1, -1, -1, 1, -1, -0.33333333333333337, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -0.4387100225903844, 0.5260820786998825],
      [1, 1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 0.33333333333333326, -0.6, -1, -0.6, 1, 1, 1, 1, 1, 1, 1, -1, -0.7118579643138692, 0.1343296101149476],
      [-1, -1, 0, 0.5, -1, 1, 1, 1, 1, 1, -0.33333333333333337, -0.33333333333333337, 1, 0.5, -1, 1, 1, -1, -1, 1, -1, -1, 1, -0.06579348330931734, -0.6103639014486516],
      [-0.5, 1, 0, 0.5, -1, 1, 1, 1, 1, -1, -0.33333333333333337, -1, 0.3999999999999999, 0, -1, 1, 1, -1, -1, 1, -1, -1, 1, -0.018436409265014553, -0.8044081446631824],
      [-0.5, 1, 0, 0, 1, 1, 1, -1, 1, -1, -0.33333333333333337, 1, 0.19999999999999996, 0, 0.6000000000000001, 1, 1, -1, -1, -1, 1, -1, -1, -0.8814862207614553, -0.7035700096366075],
      [-1, -1, 0, 1, -1, 1, 1, 1, 1, -1, -1, 1, 0.6000000000000001, 0.5, -1, 1, -1, -1, -1, -1, -1, 1, -1, -0.6190929842635768, -0.8419915622281544],
      [1, -1, 0, -1, -1, 1, 1, 1, 1, -1, 1, -1, 0, 1, 0.6000000000000001, 1, 1, 1, -1, 1, -1, -1, 1, -0.3501631540756531, 0.17654032249266405],
      [-0.5, -1, 1, 0.5, -1, 1, -1, -1, 1, -1, 0.33333333333333326, -1, -0.19999999999999996, 0, -0.6, 1, -1, -1, -1, -1, -1, 1, 1, -0.5370051222355319, -0.028387673608443964]
    ],
    meanResponseSet: [],
    meanBitMap: [],
    pixelCoordinates: [],
    bitmaps: [],
    researchQuestionFeeds: [
        {
            label: "Sandbox",
            info: "Would you recommend the provision of a sandbox environment?",
            variableIndexes: [
                0, 10, 12, 20, 22
            ],
            map: []
        }, {
            label: "B",
            info: '',
            variableIndexes: [
                1, 3, 5
            ],
            map: []
        }, {
            label: "C",
            info: '',
            variableIndexes: [
                2, 13, 17
            ],
            map: []
        }, {
            label: "D",
            info: '',
            variableIndexes: [
                8, 16, 34
            ],
            map: []
        }, {
            label: "E",
            info: '',
            variableIndexes: [
                7, 9, 19
            ],
            map: []
        }
    ],
    squareSize: 10,
    variableOffsets: []
};

function mapResultsMean() {
    data.packedVariableSets[0].forEach((v, i) => {
        let sum = 0;
        data.packedVariableSets.forEach(set => sum += set[i]);
        data.meanResponseSet[i] = sum / data.packedVariableSets.length;
    });
}
function mapMeanResponseSet() {
    data.meanBitMap = [];
    for (let idx = 0; idx < data.pixelCoordinates.length; idx++) {
        for (let p = 0; p < data.cardinalities[idx]; p++) {
            let pixel = {
                x: data.pixelCoordinates[idx][p].x,
                y: data.pixelCoordinates[idx][p].y,
                value: data.meanResponseSet[idx]
            };
            data.meanBitMap.push(pixel);
        }
    }
}
function mapResearchQuestions() {
    data.researchQuestionFeeds.forEach((feed) => {
        feed.map = [];
        for (let idx = 0; idx < data.pixelCoordinates.length; idx++) {
            const isActivePixel = feed.variableIndexes.indexOf(idx) >= 0;
            const pixelValue = isActivePixel ? 1 : 0; //1-data.meanBitMap[idx].value;
            for (let p = 0; p < data.cardinalities[idx]; p++) {
                let pixel = {
                    x: data.pixelCoordinates[idx][p].x,
                    y: data.pixelCoordinates[idx][p].y,
                    value: pixelValue
                };
                feed.map.push(pixel);
            }
        }
    })
}
function mapVariablePixels() {
    data.cardinalities.forEach((cardinality, v) => {
        const variableOffset = data.variableOffsets[v];
        const pixels = [];
        for (let c = 0; c < cardinality; c++) {
            const pixelOffset = variableOffset + c;
            const coordinates = {
                x: pixelOffset % data.squareSize + 1,
                y: Math.floor(pixelOffset / data.squareSize) + 1
            };
            pixels.push(coordinates);
        }
        data.pixelCoordinates.push(pixels);
    })
}
function mapVariableOffsets() {
    let variableOffset = 0;
    for (let i = 0; i < data.cardinalities.length; i++) {
        data.variableOffsets.push(variableOffset);
        variableOffset = data.variableOffsets[i] + data.cardinalities[i];
    }
}
function getAbsolutePixelValue(cardinality, value, index) {
    const variableValue = Math.round(value * 100) / 100;
    let pixelValue = (1 + index) / cardinality;
    pixelValue = Math.round(pixelValue  * 100) / 100;
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
            const cardinality = data.cardinalities[v];
            const isUnpackable = [2, 5].indexOf(cardinality) >= 0;
            const isQualitativeValue = !isUnpackable;
            for (let c = 0; c < cardinality; c++) {
                let pixel = {
                    x: data.pixelCoordinates[v][c].x,
                    y: data.pixelCoordinates[v][c].y,
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
    data.bitmaps = [];
    data.packedVariableSets.forEach((set) => {
        let map = [];
        data.bitmaps.push(map);
        mapSet(set, map);
    });
    data.contrastSets.forEach(contrast => {
        mapSet(contrast.set, contrast.map);
    });
}

export type twoD = {
  x: number,
  y: number,
  label: number
};

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

export function classifySurveyData(numSamples: number, noise: number): twoD[] {
  let points: twoD[] = [];
  for (let m = 0; m < data.bitmaps.length; m++) {
    for (let p = 0; p < data.bitmaps[m].length; p++) {
      points.push({
        x: data.bitmaps[m][p].x - 0.5,
        y: data.bitmaps[m][p].y + 0.5,
        label: data.bitmaps[m][p].value
      })
    }
  }
  return points;
}


mapVariableOffsets();
mapVariablePixels();
unpackVariables();
mapResultsMean();
mapMeanResponseSet();
mapResearchQuestions();
export type Pixel = {
    x: number,
    y: number,
    value: number
};
export default data;
