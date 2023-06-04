module.exports = (equation) => {
    let result;
    if (/[^0-9%^*/()\-+. ]/g.test(equation)) return 'Invalid equation';
    
    try {
        result = new Function('return ' + equation)().toString();
    }
    catch(e) {
        return 'Invalid equation';
    }
    
    if (/[^0-9.]/g.test(result)) return 'Invalid return values';
    return result;
};