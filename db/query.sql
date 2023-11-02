CREATE TABLE roles AS
(SELECT role.id, role.title, role.salary, department.name AS department
FROM role
INNER JOIN department ON role.department_id = department.id);

CREATE TABLE managers AS
(SELECT employee.id AS id,
CONCAT(employee.first_name, " ", employee.last_name) AS manager
FROM employee);

CREATE TABLE employees AS
(SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
        managers.manager
FROM ((employee
INNER JOIN department ON employee.id = department.id)
INNER JOIN role ON employee.role_id = role.id)
LEFT JOIN managers ON employee.manager_id = managers.id);
