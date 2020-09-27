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
    console.log(`Connected as id ${connection.threadId}`);
    mainMenu();
});
// Done
function mainMenu() {
    console.log("------------------------------ MAIN MENU ------------------------------");
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
            else if (response.initalPrompt === "View all employees by department") {
                viewEmployeesByDepartment();
            }
            else if (response.initalPrompt === "View all employees by manager") {
                viewEmployeesByManager();
            }
            else if (response.initalPrompt === "View all departments") {
                viewAllDepartments();
            }
            else if (response.initalPrompt === "Add Department") {
                addDepartment();
            }
            else if (response.initalPrompt === "Remove Department") {
                removeDpartment();
            }
            if (response.initalPrompt === "View all roles") {
                viewAllRoles();
            }
            else if (response.initalPrompt === "Add Role") {
                addRole();
            }
            else if (response.initalPrompt === "Remove Role") {
                removeRole();
            }
            else if (response.initalPrompt === "Add Employee") {
                addEmployee();
            }
            else if (response.initalPrompt === "Remove Employee") {
                remnveEmployee();
            }
            else if (response.initalPrompt === "Update Employee Role") {
                updateEmployeeRole();
            }
            else if (response.initalPrompt === "Update Employee Manager") {
                updateEmployeeManager();
            }
            else viewBudget();
        });
};
// WORKING... 
// ISSUES: 
function viewAllEmployees() {
    console.log("Selecting all current employees...\n");
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, concat(m.first_name, " ", m.last_name) AS manager
    FROM employee_db.employee AS e
    LEFT JOIN employee_db.employee AS m ON e.manager_id = m.id
    JOIN employee_db.role AS r ON e.role_id = r.id				
    JOIN employee_db.department AS d ON r.department_id = d.id
    ORDER BY e.id ASC;`,
        function (error, response) {
            if (error) throw error;
            // Log all results of the SELECT statement
            // console.log(response);
            // let Etable = cTable.getTable(response);
            // console.log(Etable);
            console.table(response);
            mainMenu();
        });
};
// NOT DONE
function viewEmployeesByDepartment() { };
// NOT DONE
function viewEmployeesByManager() { };
// DONE
function viewAllDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department ORDER BY id ASC", function (error, response) {
        if (error) throw error;
        let Dtable = cTable.getTable(response);
        console.log(Dtable);
        // console.table(response);
        mainMenu();
    });
};
// NOT DONE
function removeDpartment() {
};
// WORKING...  
// NOTE: refactor using new Prmoise syntax to avoid async issue
function addDepartment() {
    console.log("Inserting a new department...\n");

    // First Promise function (aka. inquirer)
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the new department?"
            },
        ])
        //first .then() which takes in info from inquirer
        .then(function (response) {
            const departmentName = response.departmentName;
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_name: response.departmentName
                },
                function (error, result) {
                    if (error) throw error;
                    console.log(result.affectedRows + " department named " + `${departmentName}` + " inserted! \n");
                    mainMenu();
                }
            );
        });
};
// DONE 
function viewAllRoles() {
    console.log("Selecting all roles...\n");
    connection.query(`SELECT r.id, r.title, r.salary, d.department_name 
    FROM employee_db.role AS r
    JOIN employee_db.department AS d ON r.department_id = d.id
    ORDER BY r.id ASC;`,
        function (error, response) {
            if (error) throw error;
            console.table(response);
            mainMenu();
        });
};
// DONE
// NOTE: refactor using new Prmoise syntax to avoid async issue
function addRole() {
    console.log("Inserting a new role...\n");
    const departmentTableObjArr = [];
    connection.query(`SELECT id, department_name FROM employee_db.department`,
        function (error, rowData) {
            if (error) throw error;
            rowData.forEach((row) => {
                let roleObj = {
                    name: row.department_name,
                    value: row.id
                }
                departmentTableObjArr.push(roleObj);
            });
            // console.log("This is the Role Table Object Array: \n", roleTableObjArr);
        });
    inquirer
        .prompt([
            {
                name: "roleName",
                type: "input",
                message: "What is name of the new role?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the annual salary for this role?"
            },
            {
                name: "roleDepartment",
                type: "list",
                message: "Choose Department",
                choices: departmentTableObjArr,

            }
        ])
        .then(function (response) {
            const roleName = response.roleName;
            const roleSalary = response.roleSalary;
            const roleDepartment = response.roleDepartment;
            connection.query(
                `INSERT INTO employee_db.role (title, salary, department_id) VALUES ("${roleName}", "${roleSalary}", "${roleDepartment}");`,
                function (error, result) {
                    if (error) throw error;
                    console.log(result.affectedRows + " role named " + `${roleName}` + " inserted! \n");
                    mainMenu();
                }
            );
        });

    ////////////// FIND OUT HOW TO PASS roleTableObjArr to .then() to avoid async issue //////////////

    // new Promise(function (resolve, reject) {
    //     const roleTableObjArr = [];
    //     connection.query(
    //         `SELECT id, title FROM employee_db.role`,
    //         function (error, rowData) {
    //             if (error) reject(error);
    //             // console.log(rowData);
    //             if (error) throw error;
    //             rowData.forEach((row) => {
    //                 let roleObj = {
    //                     name: row.title,
    //                     value: row.id
    //                 }
    //                 // console.log(roleObj);
    //                 roleTableObjArr.push(roleObj);
    //                 resolve(roleTableObjArr);
    //             });
    //         })
    // }).then((roleResponse) => {
    //     console.log("This is the response from the SELECT ROLE PROMISE: ", roleResponse);
    //     inquirer
    //         .prompt([
    //             {
    //                 name: "roleName",
    //                 type: "input",
    //                 message: "What is name of the new role?"
    //             },
    //             {
    //                 name: "roleSalary",
    //                 type: "input",
    //                 message: "What is the annual salary for this role?"
    //             },
    //             {
    //                 name: "roleDepartment",
    //                 type: "list",
    //                 message: "Choose Department",
    //                 choices: roleTableObjArr,

    //             }
    //         ]).then(function (response) {
    //             const roleName = response.roleName;
    //             const roleSalary = response.roleSalary;
    //             const roleDepartment = response.roleDepartment;

    //             connection.query(
    //                 `INSERT INTO employee_db.role (title, salary, department_id) VALUES ("${roleName}", "${roleSalary}", "${roleDepartment}");`,
    //                 function (error, result) {
    //                     if (error) throw error;
    //                     console.log(result.affectedRows + " department named " + `${roleName}` + " inserted! \n");
    //                 }
    //             );
    //             mainMenu();
    //         });
    //     });
};
// WORKING... 
// NOTES: 
// 1. Refactor using new Prmoise syntax to avoid async issue
// 2. Find correct MYSQL logic for inserting managers
function addEmployee() {
    console.log("Inserting a new employee...\n");
    let roleTableObj = [];
    connection.query(`SELECT id, title FROM employee_db.role`,
        function (error, eRowData) {
            if (error) throw error;
            eRowData.forEach((row) => {
                let roleObj = {
                    name: row.title,
                    value: row.id
                }
                roleTableObj.push(roleObj);
            })
            // console.log("Employee Table Object: ", roleTableObj);
        })

    // Declare managerTableObjArray to start with a null to make null available for employees to have no manager and insert the integer 0 into the employee table for every instance?

    // Hardcoded available managers for now...
    let managerTableObjArr = [
        {
            name: "null",
            value: 0
        },
        {
            name: "Chris Roque",
            value: 13
        },
        {
            name: "Lorrey Talbet",
            value: 11
        }
    ];

    /////////////////// FIND CORRECT MYSQL LOGIC TO SELECT BETWEEN NULL, CHRIS, & LORREY AS MANAGERS /////////////////

    // connection.query(
    //     `SELECT e.id, concat(m.first_name, " ", m.last_name) AS manager
    //     FROM employee_db.employee AS e
    //     LEFT JOIN employee_db.employee AS m ON e.manager_id = m.id
    //     ORDER BY e.id ASC;`,
    //     function (error, mRowData) {
    //         if (error) throw error;
    //         mRowData.forEach((row) => {
    //             let managerObj = {
    //                 name: row.manager,
    //                 value: row.id
    //             }
    //             managerTableObjArr.push(managerObj);
    //         })
    //         // console.log("Manager Table Object: ", managerTableObjArr);
    //     })
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
                choices: roleTableObj
            },
            {
                name: "employeeManager",
                type: "list",
                message: "Who is this employee's manager?",
                choices: managerTableObjArr
            },

        ])
        .then(function (response) {
            const firstName = response.firstName;
            const lastName = response.lastName;
            const employeeRole = response.employeeRole;
            const employeeManager = response.employeeManager;
            // How does employe role and manager id get transfered by selecting the manager name from the inquirer prompt?

            connection.query(
                `INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) 
                VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${employeeManager}")`,
                function (error, result) {
                    if (error) throw error;
                    console.log(result.affectedRows + " employee named " + `${firstName}`+ " " + `${lastName}` + " inserted! \n");
                    // console.table(result);
                    mainMenu();
                })
        });
};
// WORKING...
// NOTES: 
// 1. Refactor using new Prmoise syntax to avoid async issue
// 2. Find correct MYSQL logic for selecting employee name and role title along with respective ids
function updateEmployeeRole() {
    console.log("Updating employee role...\n");
    const employeeObjectArray = [];
    const roleObjectArray = [];
    connection.query(
        `SELECT e.id, concat(first_name, ' ', last_name) AS full_name FROM employee_db.employee AS e`,
        function (error, eRowData) {
            if (error) throw error;
            eRowData.forEach(function (row) {
                let employeeObj = {
                    name: row.full_name,
                    value: row.id
                }
                employeeObjectArray.push(employeeObj);
            })
            // console.log("Employee Object Array: \n", employeeObjectArray);
        });

    connection.query(
        'SELECT  r.id, r.title FROM employee_db.role AS r',
        function (error, rRowData) {
            // console.log(rRowData);
            if (error) throw error;
            rRowData.forEach(function (row) {
                let roleObj = {
                    name: row.title,
                    value: row.id
                }
                roleObjectArray.push(roleObj);
            })
            // console.log("Role Object Array: \n", roleObjectArray);

            inquirer
                .prompt([
                    {
                        name: "employeeName",
                        type: "list",
                        message: "Which employee's role are you updating?",
                        choices: employeeObjectArray
                    },
                    {
                        name: "roleTitle",
                        type: "list",
                        message: "Which role is this employee being updated to?",
                        choices: roleObjectArray
                    },
                ]).then(function (response) {
                    // console.log(response);
                    const employeeName = response.employeeName;
                    const roleTitle = response.roleTitle;
                    // console.log(employeeName);
                    // console.log(roleTitle);

                    connection.query(
                        /////////////// FIGURE OUT HOW TO QUERY ID AND ACUTAL NAME AND TITLE ////////////////

                        `UPDATE employee_db.employee SET role_id = "${roleTitle}" WHERE id = "${employeeName}"`,
                        function (error, result) {
                            if (error) throw error;
                            console.log("Role Updated!\n");
                            mainMenu();
                        });
                })
        }
    )
};
// NOT DONE
function updateEmployeeManager() { };
// NOT DONE
function removeRole() { };
// NOT DONE
function removeEmployee() { };
// NOT DONE
function viewBudget() {
    // View the total utilized budget of a department -- ie the combined salaries of all employees in that department
};
