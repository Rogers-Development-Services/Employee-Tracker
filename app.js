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

let connection = mysql.createConnection(connectionConfig);

connection.connect(function (error) {
    if (error) throw error;
    console.log(`connected as id ${connection.threadId}`);
    // viewEmployee ();
    // viewRole();
    // viewDepartment ();
    // addDepartment ();
    // addRole ();
    addEmployee ();
});

function startQuestions() {
    inquirer
        .prompt({

        });
};

function viewDepartment () {
    console.log("Selecting your department...\n");
    connection.query("SELECT * FROM department WHERE ?",
    [
        {
            name: "Legal"
        }
    ],
    function (error, response) {
        if (error) throw error;
        // Log all results of the SELECT statement
        console.log(response);
        });
};

function viewRole () {
    console.log("Selecting your role...\n");
    connection.query("SELECT * FROM role WHERE ?",
    [
        {
            title: "Lawyer"
        }
    ],
    function (error, response) {
        if (error) throw error;
        // Log all results of the SELECT statement
        console.log(response);
        });
};

function viewEmployee () {
    console.log("Selecting your employee...\n");
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
        });
    };

function addDepartment () {
    console.log("Inserting a new department...\n");
    let query = connection.query(
      "INSERT INTO department SET ?",
      {
        name: "Public Relations"
      },
      function (error, response) {
        if (error) throw error;
        console.log(response.affectedRows  + " department inserted!\n");
        console.log(query.sql);
      });
};

function addRole () {
    console.log("Inserting a new role...\n");
    let query = connection.query(
      "INSERT INTO role SET ?",
      {
        title: "Social Media Lead",
        salary: "65000",
        department_id: "7"

      },
      function (error, response) {
        if (error) throw error;
        console.log(response.affectedRows  + " role inserted!\n");
        console.log(query.sql);
      });
};

function addEmployee () {
    console.log("Inserting a new employee...\n");
    let query = connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: "Reka",
        last_name: "Barton",
        role_id: "16",
        manager_id: "2" 

      },
      function (error, response) {
        if (error) throw error;
        console.log(response.affectedRows  + " employee inserted!\n");
        console.log(query.sql);
      });
};

function updateEmployeeRoles () {};

function updateEmployeeManagers () {};

function viewEmployeesByManager () {};

function removeDpartments () {};

function removeRole () {};

function removeEmployee () {};

function viewBudget () {};
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
