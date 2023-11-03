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
            await addRole();
            break;
        case "Add an employee":
            await addEmployee();
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
    const roles = await query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
    `);
    printTable(roles);
};

const viewAllEmployees = async () => {
    const employees = await query(`
        SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary,
        CONCAT(mgr.first_name, " ", mgr.last_name) AS manager
        FROM employee emp
        LEFT JOIN employee mgr ON emp.manager_id = mgr.id
        INNER JOIN department ON emp.id = department.id
        INNER JOIN role ON emp.role_id = role.id 
        `);
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
    console.log(`Added ${newDepartment.newDepartmentInput} to the detabase.`)
};

const addRole = async () => {
    const departments = await query("SELECT id, name FROM department")
    const departmentChoices = departments.map(
        department => ({value: department.id, name: department.name})
    );

    const newRole = await inquirer.prompt ([
        {
            name: "newRoleTitle",
            type: "input",
            message: "What's the name of the role title you would like to add?"
        },
        {
            name: "newSalary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "department",
            type: "list",
            message: "Choose the department for this role:",
            choices: departmentChoices
        }
    ]);
    await query("INSERT INTO role SET ?", {
        title: newRole.newRoleTitle,
        salary: newRole.newSalary,
        department_id: newRole.department
    });
    console.log(`Added ${newRole.newRoleTitle} to the detabase.`)
};

const addEmployee = async () => {
    const roles = await query("SELECT id, title, salary, department_id FROM role");
    const roleChoices = roles.map(
        role => ({value: role.id, name: role.title})
    );

    const employees = await query('SELECT id, CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee');
    const managerChoices = employees.map(
        employee => ({value: employee.id, name: employee.manager})
    );

    const newEmployee = await inquirer.prompt([
        {
            name: "newFirstName",
            type: "input",
            message: "What is the new employee's first name?"        
        },
        {
            name: "newLastName",
            type: "input",
            message: "What is the new employee's last name?"
        },
        {
            name: "newRole",
            type: "list",
            message: "Choose the role for this employee:",
            choices: roleChoices
        },
        {
            name: "newManager",
            type: "list",
            message: "Choose the manager for this employee:",
            choices: managerChoices
        }
    ]);
    await query("INSERT INTO employee SET ?", {
        first_name: newEmployee.newFirstName,
        last_name: newEmployee.newLastName,
        role_id: newEmployee.newRole,
        manager_id: newEmployee.newManager
    });
    console.log(`Added ${newEmployee.newFirstName} ${newEmployee.newLastName} to the detabase.`)
}

questions()