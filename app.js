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

connection.connect(function (error) {
    if (error) throw error;
    console.log(`connected as id ${connection.threadId}`);
    viewEmployee ();
});

function viewDepartment () {};

function viewRole () {};

function viewEmployee () {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee WHERE ?",
    [
        {
            first_name: "Matthew"
        }
    ],
    function (error, response) {
        if (error) throw error;
        // Log all results of the SELECT statement
        console.log(response);
        connection.end();
        });
    };

function addDepartment () {};

function addRole () {};

function addEmployee () {};

function updateEmployeeRoles () {};

function updateEmployeeManagers () {};

function viewEmployeesByManager () {};

function removeDpartments () {};

function removeRole () {};

function removeEmployee () {};

function viewBudget () {};
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
