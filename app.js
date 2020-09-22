// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
let cTable = require("console.table");
let table = cTable.getTable([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
};

var connection = mysql.createConnection(connectionConfig);

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});
