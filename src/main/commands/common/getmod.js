module.exports = (number) => {
    number = parseInt(number);
    return (number > 9 ? '+' : '') + Math.floor((number-10)/2);
};