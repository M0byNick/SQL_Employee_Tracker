//Basic requirements

const inquirer = require("inquirer");
const table = require("require.table");
const connection = require("./config/connection");

//Connection to MySQL
const useConnection = require("./config/connection");
const { titlePrompt, addEmployee, addRole, updateRole, updateManager, deleteEmployee, deleteDept, deleteRolePrompt } = require("./config/prompts");

//Menu set up for database manipulation
const usePrompts = require("./config/prompts");
require("console.table");

console.log('You are now connected as id $(connection.threadId} \n');
runApp();

runApp = () => {
    inquirer.prompt(prompt.titlePrompt).then((response) => {
        switch (response.initialInquiry) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all employee roles':
                viewAllRoles();
                break;
            case 'View employees by manager':
                viewAllManagers();
                break;
            case 'View employees by department':
                viewAllDepartments();
                break;
            case 'View department budget':
                view
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Update employee manager':
                updateManager();
                break;
            case 'Remove employee':
                deleteEmployee();
                break;
            case 'Remove department':
                deleteDept();
                break;
            case 'Remove role':
                deleteRolePrompt();
                break;
            case 'Quit database':
                console.log('You have exited the employee database. So long and thanks for all the fish! \n');
                connection.end();
                return;
            default:
                break;
        }
    })
};

function viewAllEmployees = () => {
    console.log("Viewing Employees")
    connection.query(`SELECT e.employeeID, e.firstName, e.lastName, role.roleTitle, department.dept_name AS department,
    role.roleSalary, CONCAT(m.firstName, ' ', m.lastName) AS manager FROM employee m RIGHT JOIN employee e ON e.managerID = m.employeeID
    JOIN role ON e.roleID = role.roleID JOIN department ON department.deptID = role.deptID ORDER BY e.employeeID ASC;`, (err, res) => {
    if (err) throw(err);
    console.table('\n', res, '\n')
    });
    console.log("Running Employee View");
    runApp();
};

function viewAllRoles = () => {
    console.log("Viewing Roles")
    connection.query(`SELECT * FROM role ORDER BY roleID ASC;`, (err, res) => {
        if (err) throw(err);
        console.table('\n', res, '\n')
        res.forEach((role) => {
            console.log(
            `ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`);
    });
    console.log("Running Role View");
    runApp();
    });
};

function viewAllDepartments = () => {
    console.log("Viewing Departments")
    connection.query(`SELECT * FROM department ORDER BY deptID ASC;`, (err, res) => {
        if(err) throw(err);
        console.table('\n', res, '\n');
        res.forEach((department) => {
            console.log(`ID: ${department.deptID} | ${department.dept_name} Department`);
        });
        console.log("Running Dept View");
        runApp();
    });
};

function viewDepartmentBudget() {
    console.log("Viewing Department Budget")
    connection.query(`SELECT d.name, 
    r.salary, sum(r.salary) AS budget
    FROM employee e 
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    group by d.name;`, (err, res) => {
        if(err) throw(err);
        console.table('\n', res, '\n');
        res.forEach((department) => {
            console.log(
                `Department: ${department.dept_name} \n Budget: ${department.budget} \n`,
            );
        });
        console.log("Running Budget View");
        runApp();
    });
};

function viewAllManagers = () => {
    console.log("Viewing Managers")
    connection.query(`SELECT employeeID, firstName, lastName FROM employee ORDER BY employeeID ASC;`, (err, res) => {
        if(err) throw(err);
        return;
    });
};