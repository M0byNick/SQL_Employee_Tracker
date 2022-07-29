//Basic requirements

const inquirer = require("inquirer");
const table = require("require.table");

//Connection to MySQL
const useConnection = require("./config/connection");
const { titlePrompt } = require("./config/prompts");

//Menu set up for database manipulation
const usePrompts = require("./config/prompts");
require("console.table");

console.log('You are now connected as id $(connection.threadId} \n');
runApp();

runApp = () => {
    inquirer.prompt(prompt.titlePrompt).then((response) => {
        switch (response.initialInquiry) {
            case 'viewAllEmployees':
                viewAllEmployees();
                break;
        }
    }

    };