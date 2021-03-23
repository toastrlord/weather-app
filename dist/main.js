/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-api */ \"./src/weather-api.js\");\n\n\nconst submitButton = document.querySelector('#submit-button');\nconst cityInputBox = document.querySelector('#city-name');\n\nsubmitButton.addEventListener('click', () => {\n    if (cityInputBox.checkValidity()) {\n        console.log('checking for cities');\n        const cities = (0,_weather_api__WEBPACK_IMPORTED_MODULE_0__.findCities)(cityInputBox.value);\n        if (cities.length === 1) {\n            console.log((0,_weather_api__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(cities[0]));\n        }\n        else {\n            // have to display the cities\n            console.log(cities);\n        }\n    }\n});\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/weather-api.js":
/*!****************************!*\
  !*** ./src/weather-api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findCities\": () => (/* binding */ findCities),\n/* harmony export */   \"fetchWeatherData\": () => (/* binding */ fetchWeatherData)\n/* harmony export */ });\n\n\nconst apiKey = '056fbaeb5e0ac21a223f3af28f256fc7';\nconst apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';\nconst apiCallEnd = `&appid=${apiKey}`;\nconst cityData = loadCityData();\n\nasync function loadCityData() {\n    try {\n        console.log('loading');\n        const response = await fetch('city.list.json', {mode: 'cors'});\n        const cityData = await response.json();\n        return cityData;\n    }\n    catch {error} {\n        console.log(error);\n    }\n}\n\nasync function findCities(name) {\n    const lowercaseName = name.toLowerCase().trim();\n    \n    const cities = (await cityData).filter((city) => {\n        return city.name.toLowerCase() === lowercaseName;\n    });\n    return cities;\n}\n\nfunction processWeatherData(data) {\n    const daily = data.daily;\n    return daily.map((dayData) => {\n        return {\n            clouds: dayData.clouds,\n            humidity: dayData.humidity,\n            rain: dayData.rain, \n            temp: dayData.temp,\n        };\n    });\n}\n\nasync function fetchWeatherData(city) {\n    try {\n        const apiMiddle = `lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly&units=imperial`;\n        const response = await fetch(`${apiCallStart}${apiMiddle}${apiCallEnd}`, {mode: 'cors'});\n        const weatherData = await response.json();\n        console.log(processWeatherData(city));\n    }\n    catch(error) {\n        console.log(error);\n    }\n}\n\n\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/weather-api.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;