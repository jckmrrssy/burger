// Import MySQL
let connection = require("../config/connection.js");

// Helper functions

// Prints an array of question marks depending how many are needed
function printQMs(amount) {
    var arr = [];
  
    for (var i = 0; i < amount; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  };
//   Converts object properties into SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };


let orm = {
    all: function(tableInput, callback) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            callback(res);
        });
    },
    
    insertOne: function (table, cols, vals, callback) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQMs(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            callback(res);
        });
    },
    
    updateOne: function (table, objCols, condition, callback) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objCols);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            callback(res);
        });
    }
};

// Export the ORM object in module.exports.
module.exports = orm;