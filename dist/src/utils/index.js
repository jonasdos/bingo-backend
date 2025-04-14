"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = generateRandomNumber;
exports.generateRandomNumberNotUsed = generateRandomNumberNotUsed;
function generateRandomNumber(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
function generateRandomNumberNotUsed(numbers, min, max) {
    var allNumbersAlreadyUsed = numbers.length >= max - min + 1;
    if (allNumbersAlreadyUsed)
        return null;
    var nextNumber = generateRandomNumber(min, max);
    var nextNumberFound = false;
    do {
        var numberAlreadyUsed = numbers.find(function (number) { return number === nextNumber; });
        if (!numberAlreadyUsed)
            nextNumberFound = true;
        else {
            nextNumber = generateRandomNumber(min, max);
        }
    } while (!nextNumberFound);
    return nextNumber;
}
