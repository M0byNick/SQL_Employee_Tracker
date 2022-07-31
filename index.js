//Basic requirements

const inquirer = require("inquirer");
const table = require("require.table");
const connection = require("./config/connection");

//Connection to MySQL
const useConnection = require("./config/connection");
const prompts = require("./config/prompts");
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

function viewAllEmployees() {
    console.log("Viewing Employees")
    connection.query(`SELECT employee.employeeID, employee.firstName, employee.lastName, role.roleTitle, department.dept_name AS department,
    role.roleSalary, CONCAT(manager.firstName, ' ', manager.lastName) AS manager FROM employee m RIGHT JOIN employee employee ON employee.managerID = manager.employeeID
    JOIN role ON employee.roleID = role.roleID JOIN department ON department.deptID = role.deptID ORDER BY employee.employeeID ASC;`, (err, res) => {
    if(err) throw(err);
    console.table('\n', res, '\n')
    });
    console.log("Running Employee View");
    runApp();
};

function viewAllEmployeesByDept() {
    console.log("Viewing Employees by Department")
    connection.query(`SELECT deparment.deptID, department.dept_name FROM employee employee LEFT JOIN role role ON employee.roleID = role.roleID
    LEFT JOIN department department ON department.deptID = role.deptID GROUP BY department.deptID, department.dept_name ASC;`, (err, res) => {
        if(err) throw(err);
        const deptChoices = res.map((viewDept) => ({name: viewDept.dept_name, value: viewDept.deptID}));
        inquirer.prompt(prompts.viewByDeptPrompt(deptChoices)).then(function(response){
            connection.query(`SELECT employee.employeeID, employee.firstName, employee.lastName, role.roleTitle, department.dept_name AS department FROM
            employee employee JOIN role role ON employee.roleID = role.roleID JOIN department department ON department.deptID = role.deptID WHERE department.deptID = ${response.department};`, (err, res) => {
                if(err) throw(err);
                console.table("\n Departments: ", res);
                console.log("Viewing Employees' Departments");
                runApp();
            });
        });
    });
};

function viewAllEmployeesByManager() {
    console.log("Viewing Employees by Manager")
    connection.query(`SELECT employeeID, firstName, lastName FROM employee ORDER by employeeID ASC;`, (err, res) => {
        if(err) throw(err);
        const managerChoices = res.map((employee) => ({name: employee.firstName + ' ' + employee.lastName, value: employee.employeeID}));
        inquirer.prompt(prompts.viewByManagerPrompt(managerChoices)).then(function(response){
            connection.query(`SELECT employee.employeeID, employee.firstName, employee.lastName, role.roleTitle, department.dept_name, role.roleSalary, CONCAT(m.firstName,
            ' ', m.lastName) manager FROM employee m RIGHT JOIN employee employee ON employee.managerID = m.employeeID JOIN role ON employee.roleID = role.roleID JOIN
            department ON department.deptID = role.deptID WHERE employee.managerID = ${response.manager} ORDER BY employee.employeeID ASC;`, (err, res) => {
                if(err) throw(err);
                console.table('\n', res, '\n');
                runApp();
            });
        });
    });
};

function viewAllRoles() {
    console.log("Viewing Roles")
    connection.query(`SELECT * FROM role ORDER BY roleID ASC;`, (err, res) => {
        if(err) throw(err);
        console.table('\n', res, '\n')
        res.forEach((role) => {
            console.log(
            `ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`);
    });
    console.log("Running Role View");
    runApp();
    });
};

function viewAllDepartments() {
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
    console.log("Viewing Department Budgets")
    var query = `SELECT department.dept_name, role.roleSalary, sum(role.roleSlary) AS budget FROM employee LEFT JOIN role ON employee.roleID = role.roleID
    LEFT JOIN department ON role.deptID = department.deptID group by department.dept_name;`
    connection.query(query, function (err, res) {
        if(err) throw(err);
        res.forEach((department) => {
            console.log(
                `Department: ${department.dept_name} \n Budget: ${department.budget} \n`,
            );
        });
        console.log("Running Budget View");
        runApp();
    });
}

function addEmployee() {
    console.log("Adding New Employee");
    let deptArray = [];
    connection.query(`SELECT deptID, dept_name * FROM department`, (err, res) => {
        if(err) throw(err);
        res.forEach((newDept) => {
            deptArray.push(`${newDept.deptID} ${newDept.dept_name}`);
            console.log("Added Employee to Dept");
        });
        let roleArray = [];
        connection.query(`SELECT roleID, roleTitle from role`, (err, res) => {
            if(err) throw(err);
            res.forEach((newRole) => {
                roleArray.push(`${newRole.roleID} ${newRole.roleTitle}`);
                console.log("Added Role to Employee");
            });
            let managerArray = [];
            connection.query(`SELECT employeeID, firstName, lastName from employee`, (err, res) => {
                if(err) throw(err);
                res.forEach((newManager) => {
                    managerArray.push(`${newManager.employeeID} ${newManager.firstName} ${newManager.lastName}`);
                    console.log("Added Employee to Manager");
                });
            });
            inquirer.prompt(prompts.addEmployeePrompt(deptArray, roleArray, managerArray)).then((response) => {
                let roleChosen = parseInt(response.role);
                let managerChosen = parseInt(response.manager);
                connection.query("INSERT INTO employee SET ?", {
                    firstName: response.firstName,
                    lastName: response.lastName,
                    roleID: roleChosen,
                    managerID: managerChosen,
                },
                (err, res) => {
                    if(err) throw(err);
                    console.log("\n" + res.affectedRows + "Your new employee has been added");
                    runApp();
                },
                );
            });
        });
    });
};

function addDepartment() {
    inquirer.prompt(prompts.addDepartmentPrompt).then(function (response) {
        connection.query("INSERT INTO department (dept_name) VALUES ( ? )", response.department, function (err, res) {
            if(err) throw(err);
            console.log(`Congratulations on opening the new department, ${response.department}.`);
        });
        runApp();
    });
};

function addRole() {
    connection.query(`SELECT * FROM department;`, function (err, res) {
        if(err) throw(err);
        const deptChoices = res.map(department => ({name: department.dept_name, value: department.deptID}));
        inquirer.prompt(prompts.addRolePrompt(deptChoices)).then(function (response){
            connection.query(`INSERT INTO role SET ?`, {
                roleTitle: response.roleTitle,
                roleSalary: response.roleSalary,
                deptID: response.deptID,
            },
            function (err, res) {
                if(err) throw(err);
                console.log("\n" + res.affectedRows + "Your new role has been added");
                runApp();
            });
        });
    });
};

function updateRole