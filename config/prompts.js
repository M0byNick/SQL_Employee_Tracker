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
            message: "To add an employee, please enter their first name",
        },
        {
            type: "input",
            name: "lastName",
            message: "Now enter their last name",
        },
        {
            type: "list",
            name: "department",
            message: "Please assign the employee to a department of your choice",
            choices: deptArray,
        },
    ]
}