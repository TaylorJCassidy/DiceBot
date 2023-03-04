/**
 * Generates a pseduo random number between the maximum and minimum range.
 * @param {Number} max maximum possible value
 * @param {Number} min mimimum possible value
 * @returns {Number} the generated random number
 */
module.exports = (max,min) => {
    return Math.round((Math.random() * (max - min)) + min);
};