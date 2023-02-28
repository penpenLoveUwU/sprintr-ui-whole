/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/map/MapLayerManagerUtils.js":
/*!*****************************************!*\
  !*** ./src/map/MapLayerManagerUtils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROCESS_LAYERS": () => (/* binding */ PROCESS_LAYERS)
/* harmony export */ });
/* harmony import */ var _utils_colors_FourColorTheoremSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/colors/FourColorTheoremSolver */ "./src/map/utils/colors/FourColorTheoremSolver.js");

function PROCESS_LAYERS(layers, pixelSize, colors, backgroundColors, selectedSegmentIds) {
  const dimensions = CALCULATE_REQUIRED_DIMENSIONS(layers);
  const width = dimensions.x.sum;
  const height = dimensions.y.sum;
  const pixelData = new Uint8ClampedArray(width * height * 4);
  const segmentLookupData = new Uint8ClampedArray(width * height);
  const segmentLookupIdMapping = new Map(); //Because segment IDs are arbitrary strings, we need this mapping to an int for the lookup data
  const colorFinder = new _utils_colors_FourColorTheoremSolver__WEBPACK_IMPORTED_MODULE_0__.FourColorTheoremSolver(layers, pixelSize);
  const hasSelectedSegments = selectedSegmentIds.length === 0;
  [...layers].sort((a, b) => {
    return TYPE_SORT_MAPPING[a.type] - TYPE_SORT_MAPPING[b.type];
  }).forEach(layer => {
    let color;
    switch (layer.type) {
      case "floor":
        if (hasSelectedSegments) {
          color = colors.floor;
        } else {
          color = backgroundColors.floor;
        }
        break;
      case "wall":
        if (hasSelectedSegments) {
          color = colors.wall;
        } else {
          color = backgroundColors.wall;
        }
        break;
      case "segment":
        {
          var _layer$metaData$segme;
          if (hasSelectedSegments || selectedSegmentIds.includes((_layer$metaData$segme = layer.metaData.segmentId) !== null && _layer$metaData$segme !== void 0 ? _layer$metaData$segme : "")) {
            var _layer$metaData$segme2;
            color = colors.segments[colorFinder.getColor((_layer$metaData$segme2 = layer.metaData.segmentId) !== null && _layer$metaData$segme2 !== void 0 ? _layer$metaData$segme2 : "")];
          } else {
            var _layer$metaData$segme3;
            color = backgroundColors.segments[colorFinder.getColor((_layer$metaData$segme3 = layer.metaData.segmentId) !== null && _layer$metaData$segme3 !== void 0 ? _layer$metaData$segme3 : "")];
          }
          break;
        }
    }
    if (!color) {
      // eslint-disable-next-line no-console
      console.error(`Missing color for ${layer.type} with segment id '${layer.metaData.segmentId}'.`);
      color = {
        r: 128,
        g: 128,
        b: 128
      };
    }
    let segmentLookupId = 0;
    if (layer.metaData.segmentId) {
      segmentLookupId = segmentLookupIdMapping.size + 1;
      segmentLookupIdMapping.set(segmentLookupId, layer.metaData.segmentId);
    }
    for (let i = 0; i < layer.pixels.length; i = i + 2) {
      const offset = layer.pixels[i] - dimensions.x.min + (layer.pixels[i + 1] - dimensions.y.min) * width;
      const imgDataOffset = offset * 4;
      pixelData[imgDataOffset] = color.r;
      pixelData[imgDataOffset + 1] = color.g;
      pixelData[imgDataOffset + 2] = color.b;
      pixelData[imgDataOffset + 3] = 255;
      segmentLookupData[offset] = segmentLookupId;
    }
  });
  return {
    pixelData: pixelData,
    width: dimensions.x.sum,
    height: dimensions.y.sum,
    left: dimensions.x.min,
    top: dimensions.y.min,
    segmentLookupData: segmentLookupData,
    segmentLookupIdMapping: Object.fromEntries(segmentLookupIdMapping)
  };
}
function CALCULATE_REQUIRED_DIMENSIONS(layers) {
  const dimensions = {
    x: {
      min: Infinity,
      max: -Infinity,
      sum: 0
    },
    y: {
      min: Infinity,
      max: -Infinity,
      sum: 0
    }
  };
  layers.forEach(layer => {
    dimensions.x.min = layer.dimensions.x.min < dimensions.x.min ? layer.dimensions.x.min : dimensions.x.min;
    dimensions.x.max = layer.dimensions.x.max > dimensions.x.max ? layer.dimensions.x.max : dimensions.x.max;
    dimensions.y.min = layer.dimensions.y.min < dimensions.y.min ? layer.dimensions.y.min : dimensions.y.min;
    dimensions.y.max = layer.dimensions.y.max > dimensions.y.max ? layer.dimensions.y.max : dimensions.y.max;
  });
  dimensions.x.sum = dimensions.x.max - dimensions.x.min + 1;
  dimensions.y.sum = dimensions.y.max - dimensions.y.min + 1;
  dimensions.x.sum = isFinite(dimensions.x.sum) ? dimensions.x.sum : 0;
  dimensions.y.sum = isFinite(dimensions.y.sum) ? dimensions.y.sum : 0;
  return dimensions;
}
// This is important because it determines the draw order
const TYPE_SORT_MAPPING = {
  "floor": 14,
  "segment": 15,
  "wall": 16
};

/***/ }),

/***/ "./src/map/utils/colors/ColorUtils.js":
/*!********************************************!*\
  !*** ./src/map/utils/colors/ColorUtils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create2DArray": () => (/* binding */ create2DArray)
/* harmony export */ });
function create2DArray(xLength, yLength) {
  return [...new Array(xLength)].map(elem => {
    return [...new Array(yLength)];
  });
}

/***/ }),

/***/ "./src/map/utils/colors/FourColorTheoremSolver.js":
/*!********************************************************!*\
  !*** ./src/map/utils/colors/FourColorTheoremSolver.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FourColorTheoremSolver": () => (/* binding */ FourColorTheoremSolver)
/* harmony export */ });
/* harmony import */ var _MapAreaVertex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapAreaVertex */ "./src/map/utils/colors/MapAreaVertex.js");
/* harmony import */ var _MapAreaGraph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapAreaGraph */ "./src/map/utils/colors/MapAreaGraph.js");
/* harmony import */ var _ColorUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorUtils */ "./src/map/utils/colors/ColorUtils.js");



class FourColorTheoremSolver {
  constructor(layers, pixelSize) {
    /**
     * @param {number} resolution - Minimal resolution of the map scanner in pixels. Any number higher than one will lead to this many pixels being skipped when finding segment boundaries.
     * For example: If the robot measures 30cm in length/width, this should be set to 6, as no room can be smaller than 6 pixels. This of course implies that a pixel represents 5cm in the real world.
     */
    const resolution = Math.floor(30 / pixelSize);
    this.stepFunction = function (c) {
      return c + resolution;
    };
    const preparedLayers = this.preprocessLayers(layers);
    if (preparedLayers !== undefined) {
      const mapData = this.createPixelToSegmentMapping(preparedLayers);
      this.areaGraph = this.buildGraph(mapData);
      this.areaGraph.colorAllVertices();
    }
  }
  /*
   * @param {string} segmentId - ID of the segment you want to get the color for.
   * The segment ID is extracted from the layer meta data in the first contructor parameter of this class.
   * @returns {number} The segment color, represented as an integer. Starts at 0 and goes up the minimal number of colors required to color the map without collisions.
   */
  getColor(segmentId) {
    if (this.areaGraph === undefined) {
      // Layer preprocessing seems to have failed. Just return a default value for any input.
      return 0;
    }
    const segmentFromGraph = this.areaGraph.getById(segmentId);
    if (segmentFromGraph && segmentFromGraph.color !== undefined) {
      return segmentFromGraph.color;
    } else {
      return 0;
    }
  }
  preprocessLayers(layers) {
    const internalSegments = [];
    const boundaries = {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity
    };
    const filteredLayers = layers.filter(layer => {
      return layer.type === "segment";
    });
    if (filteredLayers.length <= 0) {
      return undefined;
    }
    filteredLayers.forEach(layer => {
      const allPixels = [];
      for (let index = 0; index < layer.pixels.length - 1; index += 2) {
        const p = {
          x: layer.pixels[index],
          y: layer.pixels[index + 1]
        };
        FourColorTheoremSolver.setBoundaries(boundaries, p);
        allPixels.push(p);
      }
      if (layer.metaData.segmentId !== undefined) {
        internalSegments.push({
          segmentId: layer.metaData.segmentId,
          name: layer.metaData.name,
          pixels: allPixels
        });
      }
    });
    return {
      boundaries: boundaries,
      segments: internalSegments
    };
  }
  static setBoundaries(res, pixel) {
    if (pixel.x < res.minX) {
      res.minX = pixel.x;
    }
    if (pixel.y < res.minY) {
      res.minY = pixel.y;
    }
    if (pixel.x > res.maxX) {
      res.maxX = pixel.x;
    }
    if (pixel.y > res.maxY) {
      res.maxY = pixel.y;
    }
  }
  createPixelToSegmentMapping(preparedLayers) {
    const pixelData = (0,_ColorUtils__WEBPACK_IMPORTED_MODULE_2__.create2DArray)(preparedLayers.boundaries.maxX + 1, preparedLayers.boundaries.maxY + 1);
    const segmentIds = [];
    preparedLayers.segments.forEach(seg => {
      segmentIds.push(seg.segmentId);
      seg.pixels.forEach(p => {
        pixelData[p.x][p.y] = seg.segmentId;
      });
    });
    return {
      map: pixelData,
      segmentIds: segmentIds,
      boundaries: preparedLayers.boundaries
    };
  }
  buildGraph(mapData) {
    const vertices = mapData.segmentIds.map(i => {
      return new _MapAreaVertex__WEBPACK_IMPORTED_MODULE_0__.MapAreaVertex(i);
    });
    const graph = new _MapAreaGraph__WEBPACK_IMPORTED_MODULE_1__.MapAreaGraph(vertices);
    this.traverseMap(mapData.boundaries, mapData.map, (x, y, currentSegmentId, pixelData) => {
      const newSegmentId = pixelData[x][y];
      graph.connectVertices(currentSegmentId, newSegmentId);
      return newSegmentId !== undefined ? newSegmentId : currentSegmentId;
    });
    return graph;
  }
  traverseMap(boundaries, pixelData, func) {
    // row-first traversal
    for (let y = boundaries.minY; y <= boundaries.maxY; y = this.stepFunction(y)) {
      let rowFirstSegmentId = undefined;
      for (let x = boundaries.minX; x <= boundaries.maxX; x = this.stepFunction(x)) {
        rowFirstSegmentId = func(x, y, rowFirstSegmentId, pixelData);
      }
    }
    // column-first traversal
    for (let x = boundaries.minX; x <= boundaries.maxX; x = this.stepFunction(x)) {
      let colFirstSegmentId = undefined;
      for (let y = boundaries.minY; y <= boundaries.maxY; y = this.stepFunction(y)) {
        colFirstSegmentId = func(x, y, colFirstSegmentId, pixelData);
      }
    }
  }
}

/***/ }),

/***/ "./src/map/utils/colors/MapAreaGraph.js":
/*!**********************************************!*\
  !*** ./src/map/utils/colors/MapAreaGraph.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapAreaGraph": () => (/* binding */ MapAreaGraph)
/* harmony export */ });
class MapAreaGraph {
  constructor(vertices) {
    this.vertices = vertices;
    this.vertexLookup = new Map();
    this.vertices.forEach(v => {
      this.vertexLookup.set(v.id, v);
    });
  }
  connectVertices(id1, id2) {
    if (id1 !== undefined && id2 !== undefined && id1 !== id2) {
      if (this.vertexLookup.has(id1)) {
        this.vertexLookup.get(id1).appendVertex(id2);
      }
      if (this.vertexLookup.has(id2)) {
        this.vertexLookup.get(id2).appendVertex(id1);
      }
    }
  }
  /**
   * Color the graphs vertices using a greedy algorithm. Any vertices that have already been assigned a color will not be changed.
   * Color assignment will start with the vertex that is connected with the highest number of edges. In most cases, this will
   * naturally lead to a distribution where only four colors are required for the whole graph. This is relevant for maps with a high
   * number of segments, as the naive, greedy algorithm tends to require a fifth color when starting coloring in a segment far from the map's center.
   *
   */
  colorAllVertices() {
    this.vertices.sort((l, r) => {
      return r.adjacentVertexIds.size - l.adjacentVertexIds.size;
    });
    this.vertices.forEach(v => {
      if (v.adjacentVertexIds.size <= 0) {
        v.color = 0;
      } else {
        const adjacentVertices = this.getAdjacentVertices(v);
        const existingColors = adjacentVertices.filter(vert => {
          return vert.color !== undefined;
        }).map(vert => {
          return vert.color;
        });
        v.color = this.lowestColor(existingColors);
      }
    });
  }
  getAdjacentVertices(vertex) {
    return Array.from(vertex.adjacentVertexIds).map(id => {
      return this.getById(id);
    }).filter(adjacentVertex => {
      return adjacentVertex !== undefined;
    });
  }
  getById(id) {
    return this.vertices.find(v => {
      return v.id === id;
    });
  }
  lowestColor(colors) {
    if (colors.length <= 0) {
      return 0;
    }
    for (let index = 0; index < colors.length + 1; index++) {
      if (!colors.includes(index)) {
        return index;
      }
    }
  }
}

/***/ }),

/***/ "./src/map/utils/colors/MapAreaVertex.js":
/*!***********************************************!*\
  !*** ./src/map/utils/colors/MapAreaVertex.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapAreaVertex": () => (/* binding */ MapAreaVertex)
/* harmony export */ });
class MapAreaVertex {
  constructor(id) {
    this.id = id;
    this.adjacentVertexIds = new Set();
    this.color = undefined;
  }
  appendVertex(vertexId) {
    if (vertexId !== undefined) {
      this.adjacentVertexIds.add(vertexId);
    }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./src/map/MapLayerManager.worker.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapLayerManagerUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapLayerManagerUtils */ "./src/map/MapLayerManagerUtils.js");

let cachedLayers = [];
window.self.postMessage({
  ready: true
});
window.self.addEventListener("message", evt => {
  //According to SonarJS S2819, this might be problematic
  //I honestly have no idea if this check is actually needed in a webworker context, but I'll do as the tool says.
  // if (evt.origin !== "") {
  //     // eslint-disable-next-line no-console
  //     console.warn(`Received event with unexpected origin "${evt.origin}"`);
  //     return;
  // }
  if (evt.data.mapLayers) {
    cachedLayers = evt.data.mapLayers;
  }
  const rendered = (0,_MapLayerManagerUtils__WEBPACK_IMPORTED_MODULE_0__.PROCESS_LAYERS)(cachedLayers, evt.data.pixelSize, evt.data.colors, evt.data.backgroundColors, evt.data.selectedSegmentIds);
  window.self.postMessage({
    pixelData: rendered.pixelData.buffer,
    width: rendered.width,
    height: rendered.height,
    left: rendered.left,
    top: rendered.top,
    segmentLookupData: rendered.segmentLookupData.buffer,
    segmentLookupIdMapping: rendered.segmentLookupIdMapping
  }, {
    transfer: [rendered.pixelData.buffer, rendered.segmentLookupData.buffer]
  });
});
})();

/******/ })()
;
//# sourceMappingURL=src_map_MapLayerManager_worker_js.chunk.js.map