const inquirer = require("inquirer");
const query = require("./server.js");
const { printTable } = require("console-table-printer");

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
            await viewAllRoles();
            break;
        case "View all employees":
            await viewAllEmployees();
            break;
        case "Add a department":
            await addDepartment();
            break;
        case "Add a role":
            break;
        case "Add an employee":
            break;
        case "Update an employee role":
            break;
    }
    questions();
};

const viewAllDepartments = async () => {
    const departments = await query("SELECT * FROM department");
    printTable(departments);
};

const viewAllRoles = async () => {
    const roles = await query("SELECT * FROM roles");
    printTable(roles);
};

const viewAllEmployees = async () => {
    const employees = await query("SELECT * FROM employees");
    printTable(employees);
};

const addDepartment = async () => {
    const newDepartment = await inquirer.prompt (
        {
            name: "newDepartmentInput",
            type: "input",
            message: "What's the name of the department you would like to add?"
        }
    );
    const newDepartmentAdded = await query("INSERT INTO department SET ?", {
        name: newDepartment.newDepartmentInput
    });
};



questions()