// Require orm
let orm = require("../config/orm.js");


// Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
let burger = {
    all: function(callback) {
        orm.all("burgers", (res) => {
            callback(res);
        });
    },
    insertOne: function(cols, vals, callback) {
        orm.insertOne("burgers", cols, vals, (res) => {
            callback(res);
        });
    },
    update: function(objCols, condition, callback) {
        orm.update("burgers", objCols, condition, callback, (res) => {
            callback(res);
        });
    }
};

// Export at the end of the burger.js file.
module.exports = burger;