let config = {
  headers: ['Organization', 'Practices addressing ethical challenges', 'Practice supporting communication/publication', 'Share resources (which)', 'CD at MA-level', 'Part of Curriculum', 'General/specialized', 'Other', 'DRM part of existing or separate course', 'Developed own material', 'Who developed it', 'Willingness to share course material', 'Support for DM', 'Online DH training', 'Awareness of following initiative ', 'Willingness to collaborate on resources', 'CD: EDA', 'CD: Statistics', 'CD: Ethics', 'CD: Data rights and protection', 'CD: Interdisciplinary dialogue', 'Interest in HPC', 'Course integrated/separate', 'DRM – Department', 'DRM – Faculty'],
  cardinalities: [5, 2, 3, 5, 2, 2, 2, 2, 2, 2, 4, 4, 11, 5, 6, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5],
  testSet: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
      inputMask: [
        0, 10, 20, 22, 24
      ],
      outputs: [0, 10],
      pixelMask: null,
      map: []
    }, {
      label: "B",
      info: '',
      inputMask: [
        1, 3, 5
      ],
      outputs: [1],
      pixelMask: null,
      map: []
    }, {
      label: "C",
      info: '',
      inputMask: [
        2, 13, 17
      ],
      outputs: [2],
      pixelMask: null,
      map: []
    }, {
      label: "D",
      info: '',
      inputMask: [
        8, 16, 25
      ],
      outputs: [4],
      pixelMask: null,
      map: []
    }, {
      label: "E",
      info: '',
      inputMask: [
        7, 9,
      ],
      outputs: [6],
      pixelMask: null,
      map: []
    }
  ],
  squareSize: 10,
  variableOffsets: []
};

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
  config.researchQuestionFeeds.forEach((feed) => {
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

function mapPixelMasks() {
  function isPixelIncluded(x: number, y: number, pixels: any[]): boolean {
    let found = false;
    for (let c = 0; c < pixels.length; c++) { // variable pixel coordinates (c)
      let variablePixel = pixels[c];
      found = variablePixel.x === x + 1 && variablePixel.y === y + 1; // todo: stinks 0- and 1-based indexes
      if (found) break
    }
    return found;
  }
  config.researchQuestionFeeds.forEach(feed => {
    feed.pixelMask = [];
    for (let y = 0; y < config.squareSize; y++) { // row (y)
      feed.pixelMask[y] = [];
      for (let x = 0; x < config.squareSize; x++) { // column (x)
        feed.pixelMask[y][x] = 0;
        for (let v = 0; v < feed.outputs.length; v++) {
          const variableIndex = feed.outputs[v];
          feed.pixelMask[y][x] = isPixelIncluded(x, y, config.pixelCoordinates[variableIndex]) ? 1 : 0;
          if (feed.pixelMask[y][x] === 1) {
            break;
          }
        }
      }
    }
    // console.log(feed.label, feed.pixelMask)
  })
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
  config.contrastSets.forEach(contrast => {
    mapSet(contrast.set, contrast.map);
  });
}

mapVariableOffsets();
mapVariablePixels();
unpackVariables();
mapResultsMean();
mapMeanResponseSet();
mapResearchQuestions();
mapPixelMasks();

export default config;
