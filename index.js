const inquirer = require("inquirer");
const query = require("./server.js");

const questions = async () => {
    const options = await inquirer.prompt (
    {
        type: "list",
        name: "options",
        message: "Please choose an option from the following list:",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    });
    switch (options.options) {
        case "View all departments":
            await viewAllDepartments();
            break;
        case "View all roles":
            break;
        case "View all employees":
            break;
        case "Add a department":
            break;
        case "Add a role":
            break;
        case "Add an employee":
            break;
        case "Update an employee role":
            break;
    }
};

const viewAllDepartments = async () => {
    const departments = await query("SELECT * FROM department");
    console.log(departments);
};

questions()