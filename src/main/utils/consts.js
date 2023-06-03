module.exports = {
    diceRegex: new RegExp(/^((((\d{0,2}d\d{1,3})|-?\d{1,3}) *[\+\-\*\/] *)*(\d{0,2}d\d{1,3})( *[\+\-\*\/] *\d{1,3})*( *~ *(res|vul|a|d))*)$/, 'i')
};