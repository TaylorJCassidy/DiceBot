module.exports = {
    randomNoGen: (max,min) => {
        return Math.round((Math.random() * (max - min)) + min);
    }
}