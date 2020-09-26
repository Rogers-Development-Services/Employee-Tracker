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
    mainMenu();
});
// Done
function mainMenu() {
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
// 1. Wont display employees in descending order, nor does it reset id count
// 2. Wont display employees with no managers (null)
function viewAllEmployees() {
    console.log("Selecting all current employees...\n");
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, concat(m.first_name, " ", m.last_name) AS manager
    FROM employee_db.employee AS e
    JOIN employee_db.manager AS m ON e.manager_id = m.id
    JOIN employee_db.role AS r ON e.role_id = r.id
    JOIN employee_db.department AS d ON r.department_id = d.id;`,
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
    connection.query("SELECT * FROM department", function (error, response) {
        if (error) throw error;
        // Log all results of the SELECT statement
        // console.log(response);
        let Dtable = cTable.getTable(response);
        console.log(Dtable);
        console.table(response);
        mainMenu();
    });
};
// NOT DONE
function removeDpartment() {
};
// DONE
function addDepartment() {
    console.log("Inserting a new department...\n");
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the new department?"
            },
        ])
        .then(function (response) {
            let departmentQuery = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: response.departmentName
                },
                function (error, result) {
                    if (error) throw error;
                    // console.log(result);
                    console.log(result.affectedRows + " department inserted!\n");
                    // console.log(departmentQuery);
                }
            );
        });
};
// DONE 
// ISSUES:
// 1. Wont display roles in descending order, nor does it reset id count
function viewAllRoles() {
    console.log("Selecting all roles...\n");
    connection.query(`SELECT r.id, r.title, r.salary, d.department_name 
    FROM employee_db.role AS r
    JOIN employee_db.department AS d ON r.department_id = d.id;`,
        function (error, response) {
            if (error) throw error;
            // Log all results of the SELECT statement
            console.table(response);
            mainMenu();
        });
};
// DONE
function addRole() {
    console.log("Inserting a new role...\n");
    const roleTableObj = [];
    connection.query(`SELECT id, title FROM employee_db.role`,
        function (error, rowData) {
            if (error) throw error;
            rowData.forEach((row) => {
                let roleObj = {
                    name: row.title,
                    value: row.id
                }
                // console.log(roleObj);
                roleTableObj.push(roleObj);
            });
        })
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
                choices: roleTableObj,

            }//add list of departments , make a function which queries department 
        ])
        .then(function (response) {//make another function which Inserts data
            const roleName = response.roleName;
            const roleSalary = response.roleSalary;
            const roleDepartment = response.roleDepartment;

            let roleQuery = connection.query(
                `INSERT INTO employee_db.role (title, salary, department_id) VALUES ("${roleName}", "${roleSalary}", "${roleDepartment}");`,
                function (error, result) {
                    if (error) throw error;
                    // console.log(result);
                    console.log(result.affectedRows + " department inserted!\n");
                    // console.log(roleQuery);
                    console.table(result);
                }
            );
        });

    // connection.query("SELECT * FROM department", function (error, response) {
    //     if (error) throw error;
    //     // Log all results of the SELECT statement
    //     // console.log(response);
    //     // console.log(response);
    //     const choices = response.reduce((array, value) => {array.push(value.name); 
    //         return array}, []);
    //     console.log("Line 152: ", choices);
    //     return choices;
    // })
};
// WORKING... 
function addEmployee() {
    console.log("Inserting a new employee...\n");
    const roleTableObj = [];
    connection.query(`SELECT id, title
                    FROM employee_db.role`,
        function (error, eRowData) {
            // console.log(eRowData);
            if (error) throw error;
            eRowData.forEach((row) => {
                let roleObj = {
                    name: row.title,
                    value: row.id
                }
                roleTableObj.push(roleObj);
            })
            console.log("Employee Table Object: ", roleTableObj);
        })
    let managerTableObj = [{
        name: "null",
        value: 0
    }];
    connection.query(`SELECT id, concat(first_name, " ", last_name) AS name FROM employee_db.manager;`,
        function (error, mRowData) {
            // console.log(mRowData);
            if (error) throw error;
            mRowData.forEach((row) => {
                let managerObj = {
                    name: row.name,
                    value: row.id
                }
                managerTableObj.push(managerObj);
            })
            console.log("Manager Table Object: ", managerTableObj);
        })
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
                choices: managerTableObj
            },

        ])
        .then(function (response) {
            const firstName = response.firstName;
            const lastName = response.lastName;
            const employeeRole = response.employeeRole;
            // console.log(employeeRole.value);
            const employeeManager = response.employeeManager;

            // How does employe role and manager id get transfered by selecting the manager name from the inquirer prompt?

            let employeeQuery = connection.query(
                `INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) 
                VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${employeeManager}")`,
                function (error, result) {
                    if (error) throw error;
                    console.log(result.affectedRows + " employee inserted!\n");
                    // console.table(result);
                    mainMenu();
                })
        });

            // function getDepartments() {
    //     return new Promise(function (resolve, reject) {
    //         connection.query(
    //             "SELECT * FROM department", function (error, data) {
    //                 if (error) reject(error);
    //                 resolve(data);
    //                 console.log("Data from department table: ", data);
    //                 const dObjArray = data.reduce(function (array, value) {
    //                     array.push(value.name);
    //                     return array
    //                 }, [])
    //                 console.log("Department String Array: ", dObjArray);
    //             });
    //     })
    // };

    // this makes a .then possible

    ////////////////// LOOK AT BELOW LATER /////////////////
// console.log(response);
// console.log(response.employeeManager);
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
// connection.query(
//     "SELECT DISTINCT r.id AS role_id, m.id AS manager_id FROM employee e LEFT JOIN manager m ON m.id = e.manager_id JOIN role r ON r.id = e.role_id WHERE r.title = ?",  //ideally have 1 select statement
//     [response.employeeRole],
//     function (error, idJoin) {
//         if (error) throw error;
//         console.log("This is the information from the newly joined table: ", idJoin, idJoin[0].role_id, idJoin[0].manager_id);

// connect to the role table to access role_id and from the corresponding selected role title
// connection.query(
//     "SELECT id FROM role WHERE title = ?",  //ideally have 1 select statement
//     [response.employeeRole],
//     function (error, roleRow) {
//         if (error) throw error;
//         console.log("role_id from role table: ", roleRow, roleRow[0].id ); 

// connect to the employee talbe to set name information and use the resulting role id and title 
// let query1 = connection.query(
//     "INSERT INTO employee SET ?",
//     {
//         first_name: response.firstName,
//         last_name: response.lastName,
//         role_id: idJoin[0].role_id,      //the role id is fetched from the first connection.query, we don't need response
//         manager_id: idJoin[0].manager_id    //??
//     },
//     function (error, result) {
//         if (error) throw error;
//         console.log(result);
//         console.log(result.affectedRows + " employee inserted!\n");
//         console.log(query1.sql);
//     });
//                 }

//             );
//         });
// };

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
}
// WORKING
function updateEmployeeRole() {
    console.log("Updating employee role...\n");
    const employeeObjectArray = [];
    const roleObjectArray = [];
    connection.query(
       `SELECT id, concat(first_name, ' ', last_name) AS full_name FROM employee_db.employee`,
       function(error, eRowData) {
        //    console.log(eRowData);
           if(error) throw error;
           eRowData.forEach(function(row) {
               let employeeObj = {
                   name: row.full_name,
                   value: row.id
               }
               employeeObjectArray.push(employeeObj);
           })
        //    console.log("Employee Object Array: \n", employeeObjectArray);
       })
    connection.query(
       'SELECT  r.id, r.title FROM employee_db.role AS r',
       function(error, rRowData) {
           console.log(rRowData);
           if(error) throw error;
           rRowData.forEach(function(row) {
               let roleObj = {
                   name: row.title,
                   value: row.id
               }
            roleObjectArray.push(roleObj);
           })
            console.log("Employee Object Array: \n", employeeObjectArray);
       })
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
        ])
        .then(function(response) {
            console.log(response);
            mainMenu();
        })
        .catch(function(error){
            if (error) throw error;
        });

        //     const employeeName = response.employeeName;
        //     const roleTitle = response.roleTitle;
        //     connection.query(
        //        `UPDATE employee_db.employee SET role_id = "${roleTitle}" WHERE id = "${employeeName}"`,
        //        function(error, data) {
        //            if(error) throw error;
        //            console.log(result.affectedRows + `${employeeName}` + "has had their role updated to " + `${roleTitle}`);
        //            // console.log(roleQuery);
        //            console.table(result);
        //         });
        // })
};
// NOT DONE
function updateEmployeeManager() { };
// NOT DONE
function removeRole() { };
// NOT DONE
function removeEmployee() { };
// NOT DONE
function viewBudget() { };
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
