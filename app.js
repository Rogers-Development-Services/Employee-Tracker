// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
let cTable = require("console.table");

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
    // addEmployee ();
    startQuestions();
});

function startQuestions() {
    inquirer
        .prompt({
            name: "initalPrompt",
            type: "list",
            message: "choices",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "View all departments", "Add Department", "Remove Department", "View all roles", "Add Role", "Remove Role", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View Budget"]
        })
        .then(function (response) {
            // based on answer, call respective function
            if (response.initalPrompt === "View all employees") {
                viewAllEmployees();
            }
            else if (response.initalPrompt === "Add Employee") {
                addEmployee();
            }
        });
};

function viewAllEmployees() {
    console.log("Selecting your employee...\n");
    connection.query("SELECT * FROM employee", function (error, response) {
        if (error) throw error;
        // Log all results of the SELECT statement
        // console.log(response);
        let table = cTable.getTable(response);
        console.log(table);
        startQuestions();
    });
};

function viewDepartment() {
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

function viewRole() {
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

function viewEmployee() {
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

function addDepartment() {
    console.log("Inserting a new department...\n");
    let query = connection.query(
        "INSERT INTO department SET ?",
        {
            name: "Public Relations"
        },
        function (error, response) {
            if (error) throw error;
            console.log(response.affectedRows + " department inserted!\n");
            console.log(query.sql);
        });
};

function addRole() {
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
            console.log(response.affectedRows + " role inserted!\n");
            console.log(query.sql);
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "employeeRole",
                type: "list",
                message: "What is the employee's role?",
                choices: ["Legal Team Lead", "Lawyer", "Sales Lead", "Salesperson", "Marketing Lead", "User Experience Lead", "User Experience Researcher", "User Interface Lead", "Data Science Lead", "Data Analytics Lead", "Lead Engineer", "Software Engineer", "Human Resources Lead", "Customer Support Agent", "Accountant", "Social Media Lead"]
            },
            {
                name: "employeeManager",
                type: "list",
                message: "Who is this employee's manager?",
                choices: ["Marissa Newman", "Lisa Rogers"]
            },

        ])
        .then(function (response) {
            console.log(response);
            console.log(response.employeeManager);
            // var nameArr = response.employeeManager.split(" ");
            // console.log("name Arr: ", nameArr);
            // var firstName = nameArr[0];
            // console.log("first Name: ", firstName);
            // var lastName = nameArr[1];
            // console.log("last Name: ", lastName);

            /*
            SELECT DISTINCT
                r.id AS role_id,
                m.id AS manager_id
            FROM employee e
                LEFT JOIN manager m ON m.id = e.manager_id
                JOIN role r ON r.id = e.role_id
            WHERE r.title = 'Legal Team Lead'
                AND m.first_name = 'Lisa'
                AND m.last_name = 'Rogers'
            */
            // connect to the role table to access role_id and the corresponding title
            connection.query(
                // "SELECT DISTINCT r.id AS role_id, m.id AS manager_id FROM employee e LEFT JOIN manager m ON m.id = e.manager_id JOIN role r ON r.id = e.role_id WHERE r.title = 'Legal Team Lead' AND m.first_name = 'Lisa'AND m.last_name = 'Rogers'",  //ideally have 1 select statement
                // [response.employeeRole],
                // function (error, roleRow) {
                //     if (error) throw error;
                //     console.log("This is the information from the specifict role Row: ", roleRow, roleRow[0].id);

                // connect to the role table to access role_id and from the corresponding selected role title
                connection.query(
                    "SELECT id FROM role WHERE title = ?",  //ideally have 1 select statement
                    // "SELECT id FROM role WHERE ?,
                    
                    [response.employeeRole],
                    
                    // [response.employeeRole,],
                    function (error, roleRow) {
                        if (error) throw error;
                        console.log("role_id from role table: ", roleRow, roleRow[0].id ); 

                        // connect to the employee talbe to set name information and use the resulting role id and title 
                        connection.query(
                            "INSERT INTO employee SET ?",
                            {
                                first_name: response.firstName,
                                last_name: response.lastName,
                                role_id: roleRow[0].id,      //the role id is fetched from the first connection.query, we don't need response
                                manager_id: null    //??
                            },
                            function (error, result) {
                                if (error) throw error;
                                console.log(result);
                                console.log(result.affectedRows + " employee inserted!\n");
                            });
                    }
                )
            );
        });
};

// // connect to the role table to access role_id and the corresponding title
// connection.query(
//     "SELECT id FROM role WHERE title = ?",  //ideally have 1 select statement
//     // "SELECT id FROM role WHERE ?,
//     //{
//         // title: response.employeeRole
//     //}"
//     [response.employeeRole, ],
//     function (error, roleRow) {
//         if (error) throw error;
//         console.log("This is the information from the specifict role Row: ", roleRow, roleRow[0].id);

// connection.query(
//     "SELECT id FROM manager WHERE title =?",
//     [response.employeeManager],
//     function (error, managerRow) {
//         if (error) throw error;
//         console.log("This is the info for the specific manager Row: ", managerRow, managerRow[0].id);
//     });

function updateEmployeeRoles() { };

function updateEmployeeManagers() { };

function viewEmployeesByManager() { };

function removeDpartments() { };

function removeRole() { };

function removeEmployee() { };

function viewBudget() { };
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
