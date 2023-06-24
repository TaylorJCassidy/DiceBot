const logger = require('../../utils/logger');
const log = logger('calc');

module.exports = (equation) => {
    let result;
    if (/[^0-9%^*/()\-+. ]/g.test(equation)) return 'Invalid equation';
    
    try {
        result = new Function('return ' + equation)().toString();
    }
    catch(e) {
        return 'Invalid equation';
    }
    
    if (/[^0-9.]/g.test(result)) {
        log(`Calc is trying to return data it shouldn't, equation=${equation}, result=${result}`, 'warn');
        return 'Invalid equation';
    }
    return result;
};