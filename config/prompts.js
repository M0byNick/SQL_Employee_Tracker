module.exports = {
    titlePrompt: {
        type: "list",
        name: "title",
        message: "Please choose the action you'd like to take with your employee database.",
        choices: [
            "View all Employees",
            "View Employees by Manager",
            "View Employees by Department",
            "View all Employee Roles",
            "View Department Budget",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
            "Remove Department",
            "Remove Role",
            "Quit Database",
        ],
    },
    viewByManagerPrompt: (managerChoices) => [
        {
            type: "list",
            name: "managerID",
            message: "Choose an employee manager",
            choices: managerChoices,
        },
    ],
    viewByDeptPrompt: (deptChoices) => [
        {
            type: "list",
            name: "deptID",
            message: "Choose an employee department",
            choices: deptChoices,
        },
    ],
    addEmployee: (roleArray, deptArray, managerArray) => [
        {
            type: "input",
            name: "firstName",
            message: "To add an employee, please enter their first name:",
        },
        {
            type: "input",
            name: "lastName",
            message: "Now enter their last name:",
        },
        {
            type: "list",
            name: "role",
            message: "Choose the employee's position/role within the company:",
            choices: roleArray,
        },
        {
            type: "list",
            name: "department",
            message: "Please assign the employee to a department of your choice:",
            choices: deptArray,
        },
        {
            type: "list",
            name: "manager",
            message: "Choose a manager for this employee:",
            choices: managerArray,
        },
    ],
    addRole: (deptChoices) => [
        {
            type: "input",
            name: "roleName",
            message: "What will this new role be called?",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What will this role pay an employee?",
        },
        {
            type: "list",
            name: "deptID",
            message: "Which department will this role lie in?",
            choices: deptChoices,
        },
    ],
    updateManager: (employees) => [
        {
            type: "update",
            name: "updateManager",
            message: "Choose the employee whose manager is being updated:",
            choices: employees,
        },
        {
            type: "list",
            name: "manager",
            message: "Choose employee's new manager:",
            choices: employees,
        },
    ],
    updateRole: (employees, job) => [
        {
            type: "list",
            name: "changeRole",
            message: "Choose the employee whose role is going to be changed:",
            choices: employees,
        },
            type: "list",
            name: "newRole",
            message: "Choose the employee's new job position:",
            choices: jobs,
    ],
    
}