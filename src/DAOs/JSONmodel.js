const Guild = require("../models/Guild");

class JSONmodel {
    guild;

    constructor(json) {
        if (json === undefined) {
            this.guild = new Guild();
        }
        else {
            this.guild = json.guild || new Guild();
        }
    }
}

module.exports = JSONmodel;