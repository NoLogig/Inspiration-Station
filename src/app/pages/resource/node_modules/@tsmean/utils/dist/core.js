"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreUtils;
(function (CoreUtils) {
    function deepCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }
    CoreUtils.deepCopy = deepCopy;
})(CoreUtils = exports.CoreUtils || (exports.CoreUtils = {}));
