import * as d3 from "d3";
import data from "../config/data"

let workingData = {
    pixelCoordinates: [],
    variableOffsets: [],
    bitmaps: [],
//    meanResponseSet: [],
//    meanBitMap: []
};
/*
function mapResultsMean() {
    data.sets[0].forEach((v, i) => {
        let sum = 0;
        data.sets.forEach(set => sum += set[i]);
        workingData.meanResponseSet[i] = sum / data.sets.length;
    });
}
function mapMeanResponseSet() {
    workingData.meanBitMap = [];
    for (let idx = 0; idx < workingData.pixelCoordinates.length; idx++) {
        for (let p = 0; p < data.cardinalities[idx]; p++) {
            let pixel = {
                x: workingData.pixelCoordinates[idx][p].x,
                y: workingData.pixelCoordinates[idx][p].y,
                value: workingData.meanResponseSet[idx]
            };
            workingData.meanBitMap.push(pixel);
        }
    }
}
*/
function mapResearchQuestions() {
    data.researchQuestionFeeds.forEach((feed) => {
        feed.map = [];
        for (let idx = 0; idx < workingData.pixelCoordinates.length; idx++) {
            const isActivePixel = idx === feed.variableIndex;
            const pixelValue = isActivePixel ? 1 : 0; // 1-data.meanBitMap[idx].value;
            for (let p = 0; p < data.cardinalities[idx]; p++) {
                let pixel = {
                    x: workingData.pixelCoordinates[idx][p].x,
                    y: workingData.pixelCoordinates[idx][p].y,
                    value: pixelValue
                };
                feed.map.push(pixel);
            }
        }
    })
}
function mapVariablePixels() {
    data.cardinalities.forEach((cardinality, v) => {
        const variableOffset = workingData.variableOffsets[v];
        const pixels = [];
        for (let c = 0; c < cardinality; c++) {
            const pixelOffset = variableOffset + c;
            const coordinates = {
                x: pixelOffset % data.squareSize + 1,
                y: Math.floor(pixelOffset / data.squareSize) + 1
            };
            pixels.push(coordinates);
        }
        workingData.pixelCoordinates.push(pixels);
    })
}
function mapVariableOffsets() {
    let variableOffset = 0;
    for (let i = 0; i < data.cardinalities.length; i++) {
        workingData.variableOffsets.push(variableOffset);
        variableOffset = workingData.variableOffsets[i] + data.cardinalities[i];
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
                    x: workingData.pixelCoordinates[v][c].x,
                    y: workingData.pixelCoordinates[v][c].y,
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
    workingData.bitmaps = [];
    data.sets.forEach((set) => {
        let map = [];
        workingData.bitmaps.push(map);
        mapSet(set, map);
    });
    data.contrastSets.forEach(contrast => {
        mapSet(contrast.set, contrast.map);
    });
}

/**
 * Shuffles the array using Fisher-Yates algorithm. Uses the seedrandom
 * library as the random generator.
 */
export function shuffle(array: any[]): void {
	let itemCount = array.length;
	let nextItem = 0;
	let randomIndex = 0;
	while (itemCount > 0) {
		randomIndex = Math.floor(Math.random() * itemCount);
		itemCount--;
		// swap with random item
		nextItem = array[itemCount];
		array[itemCount] = array[randomIndex];
		array[randomIndex] = nextItem;
	}
}

mapVariableOffsets();
mapVariablePixels();
unpackVariables();
// mapResultsMean();
// mapMeanResponseSet();
mapResearchQuestions();
export type Pixel = {
    x: number,
    y: number,
    value: number
};
export default workingData;
