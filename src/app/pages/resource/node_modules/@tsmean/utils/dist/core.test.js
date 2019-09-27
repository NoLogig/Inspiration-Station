"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var chai = require("chai");
var expect = chai.expect;
describe('Core Utils', function () {
    it('should correctly deep copy', function () {
        var myObject = {
            hello: "world"
        };
        var copiedData = core_1.CoreUtils.deepCopy(myObject);
        expect(copiedData.hello).to.equal("world");
        copiedData.hello = "planet";
        expect(copiedData.hello).to.equal("planet");
        expect(myObject.hello).to.equal("world");
    });
});
