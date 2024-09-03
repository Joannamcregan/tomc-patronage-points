/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Patronage-Points.js":
/*!*****************************************!*\
  !*** ./src/modules/Patronage-Points.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class PatronagePoints {
  constructor() {
    this.setDatesButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-set-dates-button');
    this.dateRangeSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-dates-section');
    this.startDate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-start-date');
    this.endDate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-end-date');
    this.pointsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-display-section');
    this.events();
  }
  events() {
    this.setDatesButton.on('click', this.showDates.bind(this));
  }
  showDates() {
    this.dateRangeSection.removeClass('hidden');
    this.setDatesButton.removeClass('purple-button');
    this.setDatesButton.addClass('orange-button');
    this.setDatesButton.on('click', this.setDates.bind(this));
  }
  setDates() {
    let startDate = this.startDate.val();
    let endDate = this.endDate.val();
    if (startDate != '' && endDate != '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-start-date-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-end-date-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcPoints/v1/getPointsByDateRange',
        type: 'GET',
        data: {
          'startDate': startDate,
          'endDate': endDate
        },
        success: response => {
          console.log(response);
          this.pointsSection.html('');
          let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html('<h2>Points Earned Between ' + startDate + ' and ' + endDate);
          this.pointsSection.append(newHeading);
          //we will have to fix the date formatting in the heading
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              //we will need to output the display name and point total of each item in the response
            }
          }
        },
        error: response => {
          console.log(response);
        }
      });
    } else {
      if (startDate == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-start-date-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-start-date-error').addClass('hidden');
      }
      if (endDate == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-end-date-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-points-no-end-date-error').addClass('hidden');
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatronagePoints);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Patronage_Points__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Patronage-Points */ "./src/modules/Patronage-Points.js");

const tomcPatronagePoints = new _modules_Patronage_Points__WEBPACK_IMPORTED_MODULE_0__["default"]();
/******/ })()
;
//# sourceMappingURL=index.js.map