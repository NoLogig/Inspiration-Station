"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebUtils;
(function (WebUtils) {
    function urlJoin(partOne, partTwo) {
        partOne = partOne.toString();
        partTwo = partTwo.toString();
        // TODO: query parameter part
        if (partOne.charAt(partOne.length - 1) === '/') {
            if (partTwo.charAt(0) === '/') {
                return partOne.substring(0, partOne.length - 1) + partTwo;
            }
            else {
                return partOne + partTwo;
            }
        }
        else {
            if (partTwo.charAt(0) === '/') {
                return partOne + partTwo;
            }
            else {
                return partOne + '/' + partTwo;
            }
        }
    }
    WebUtils.urlJoin = urlJoin;
})(WebUtils = exports.WebUtils || (exports.WebUtils = {}));
