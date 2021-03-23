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

/***/ "./src/document-manager.js":
/*!*********************************!*\
  !*** ./src/document-manager.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDailyWeatherElement\": () => (/* binding */ createDailyWeatherElement),\n/* harmony export */   \"createCityElement\": () => (/* binding */ createCityElement)\n/* harmony export */ });\n\n\nfunction getWeatherIcon(weatherDescription) {\n    return '';\n}\n\n/**\n * Generate an HTML element given one days worth of weather data\n * @param {*} dayData \n */\nfunction createDailyWeatherElement(dayData) {\n    const container = document.createElement('div');\n    container.classList.add('weather-data-display');\n    const dayOfWeek = document.createElement('div');\n    dayOfWeek.classList.add('weekday');\n    dayOfWeek.textContent = 'Day'; // FIXME!\n    container.appendChild(dayOfWeek);\n    const weatherIcon = document.createElement('img');\n    weatherIcon.src = getWeatherIcon(dayData.weatherDescription);\n    container.appendChild(weatherIcon);\n    const temperatureContainer = document.createElement('div'); // contains the high and low temperatures\n    temperatureContainer.classList.add('temperature-container');\n    const highTemp = document.createElement('div');\n    highTemp.textContent = dayData.maxTemp;\n    highTemp.classList.add('temperature');\n    temperatureContainer.appendChild(highTemp);\n    const lowTemp = document.createElement('div');\n    lowTemp.textContent = dayData.minTemp;\n    lowTemp.classList.add('temperature');\n    temperatureContainer.appendChild(lowTemp);\n    container.appendChild(temperatureContainer);\n\n    return container;\n}\n\nfunction createCityElement(cityData) {\n    const container = document.createElement('div');\n    container.classList.add('city-data-display');\n    const cityName = document.createElement('div');\n    cityName.textContent = cityData.name;\n    container.appendChild(cityName);\n    if (cityData.hasOwnProperty('state')) {\n        const stateElement = document.createElement('div');\n        stateElement.textContent = cityData.state;\n        container.appendChild(stateElement);\n    }\n    if (cityData.hasOwnProperty('country')) {\n        const countryElement = document.createElement('div');\n        countryElement.textContent = cityData.country;\n        container.appendChild(countryElement);\n    }\n\n    return container;\n}\n\n\n\n//# sourceURL=webpack://weather-app/./src/document-manager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-api */ \"./src/weather-api.js\");\n/* harmony import */ var _document_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./document-manager */ \"./src/document-manager.js\");\n\n\n\nconst submitButton = document.querySelector('#submit-button');\nconst cityInputBox = document.querySelector('#city-name');\nconst display = document.querySelector('#display');\n\nfunction clearDisplay() {\n    while (display.firstChild) {\n        display.firstChild.remove();\n    }\n}\n\nasync function search(cityName) {\n    clearDisplay();\n    const cities = await (0,_weather_api__WEBPACK_IMPORTED_MODULE_0__.findCities)(cityName);\n    if (cities.length === 0) {\n        const element = document.createElement('div');\n        element.classList.add('no-city-error');\n        element.textContent = 'No cities found!';\n        display.appendChild(element);\n    }\n    else if (cities.length === 1) {\n        const weather = await (0,_weather_api__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(cities[0]);\n        weather.forEach(dayData => {\n            const element = (0,_document_manager__WEBPACK_IMPORTED_MODULE_1__.createDailyWeatherElement)(dayData);\n            display.appendChild(element);\n        });\n    }\n    else {\n        cities.forEach(city => { \n            const element = (0,_document_manager__WEBPACK_IMPORTED_MODULE_1__.createCityElement)(city);\n            display.appendChild(element);\n            element.addEventListener('click', () => {\n                clearDisplay();\n                (0,_weather_api__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(city)\n                .then(response => {\n                    response.forEach(weather => {\n                        const element = (0,_document_manager__WEBPACK_IMPORTED_MODULE_1__.createDailyWeatherElement)(weather);\n                        display.appendChild(element);\n                    });\n                });\n            });\n        });\n\n    }\n}\n\nsubmitButton.addEventListener('click', () => {\n    if (cityInputBox.checkValidity()) {\n        search(cityInputBox.value);\n    }\n});\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/weather-api.js":
/*!****************************!*\
  !*** ./src/weather-api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findCities\": () => (/* binding */ findCities),\n/* harmony export */   \"fetchWeatherData\": () => (/* binding */ fetchWeatherData)\n/* harmony export */ });\n\n\nconst apiKey = '056fbaeb5e0ac21a223f3af28f256fc7';\nconst apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';\nconst apiCallEnd = `&appid=${apiKey}`;\nconst cityData = loadCityData();\n\nasync function loadCityData() {\n    try {\n        console.log('loading');\n        const response = await fetch('city.list.json', {mode: 'cors'});\n        const cityData = await response.json();\n        return cityData;\n    }\n    catch (error) {\n        console.log(error);\n    }\n}\n\nasync function findCities(name) {\n    const lowercaseName = name.toLowerCase().trim();\n    try {\n        const cities = (await cityData).filter((city) => {\n            return city.name.toLowerCase() === lowercaseName;\n        });\n        return cities;\n    }\n    catch(error) {\n        console.log(error);\n    }\n}\n\nfunction processWeatherData(data) {\n        return {\n            weatherDescription: data.weather[0].main,\n            clouds: data.clouds,\n            humidity: data.humidity,\n            rain: data.rain,\n            maxTemp: data.temp.max,\n            minTemp: data.temp.min,\n        };\n}\n\nasync function fetchWeatherData(city) {\n    try {\n        const apiMiddle = `lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly&units=imperial`;\n        const response = await fetch(`${apiCallStart}${apiMiddle}${apiCallEnd}`, {mode: 'cors'});\n        const weatherData = await response.json();\n        return weatherData.daily.map(city => processWeatherData(city));\n    }\n    catch(error) {\n        console.log(error);\n    }\n}\n\n\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/weather-api.js?");

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