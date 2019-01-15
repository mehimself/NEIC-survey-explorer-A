interface config {
  headers: string[],
  cardinalities: number[],
  packedVariableSets: number[][],
  feeds: string[]
}
let config = {
  // todo: add 26th variable
  // pixels to use to resolve variable values
  cardinalities: [5, 1, 3, 5, 1, 1, 1, 1, 1, 1, 4, 4, 11, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5],
  // variable values (normalized between -1 and 1)
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
  descriptions: {
    default: `
The heatmap shows the average over all responses of the survey. 
Colors visualize trends towards <span class="negative highlight">negating answers</span>, <span class="neutral highlight">neutral answers</span>, and <span class="affirmative highlight">affirmative answers</span>.
The bullets reflect the mean variable value in the training data (50% of the survey results).
Point over the heatmap to see information about individual variables and results`,
    // variable descriptions by survey variable index
    '0': `label: Organization`,
    '1': `label: Practices addressing ethical challenges`,
    '2': `label: Practice supporting communication/publication`,
    '3': `label: Share resources (which)`,
    '4': `label: CD at MA-level`,
    '5': `label: Part of Curriculum`,
    '6': `label: General/specialized`,
    '7': `label: Other`,
    '8': `label: DRM part of existing or separate course`,
    '9': `label: Developed own material`,
    '10': `label: Who developed it`,
    '11': `label: Willingness to share course material`,
    '12': `label: Support for DM`,
    '13': `label: Online DH training`,
    '14': `label: Awareness of following initiative`,
    '15': `label: Willingness to collaborate on resources`,
    '16': `label: CD: EDA`,
    '17': `label: CD: Statistics`,
    '18': `label: CD: Ethics`,
    '19': `label: CD: Data rights and protection`,
    '20': `label: CD: Interdisciplinary dialogue`,
    '21': `label: Interest in HPC`,
    '22': `label: Course integrated/separate`,
    '23': `label: DRM – Department`,
    '24': `label: DRM – Faculty`
  },
  feeds: {
    A: {
      //label: "A",
      description: `<em>A</em>: "Would you recommend the provision of a sandbox environment?"`,
      inputMask: [
        1
      ],
      trainBias: [6, 18, 25],
      map: [] // todo: outsource to processing
    },
    B: {
      //label: "B",
      description: `<em>B</em>: "Question 2 Text?"`,
      inputMask: [
        13
      ],
      trainBias: [14, 19, 21],
      map: []
    },
    C: {
      //label: "C",
      description: `<em>C</em>: "Question 3 Text?"`,
      inputMask: [
        15
      ],
      trainBias: [16, 21, 24],
      map: []
    },
    D: {
      //label: "D",
      description: `<em>D</em>: "Question 4 Text?"`,
      inputMask: [
        16
      ],
      trainBias: [4, 6, 18],
      map: []
    },
    E: {
      //label: "E",
      description: `<em>E</em>: "Question 5 Text?"`,
      inputMask: [
        22
      ],
      trainBias: [0, 1, 13],
      map: []
    }
  },
  maxIterations: 1000,
  finalIncrement: 1e-6, // pause calculation at this loss increment
  useTrainBias: false,
  biasSetSize: 20,
  debug: {
    processing: false
  }
};

export default config;
