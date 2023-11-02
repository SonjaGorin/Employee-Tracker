-- CREATE TABLE roles AS
-- (SELECT role.id, role.title, role.salary, department.name AS department
-- FROM role
-- INNER JOIN department ON role.department_id = department.id);

-- CREATE TABLE managers AS
-- (SELECT employee.id AS id,
-- CONCAT(employee.first_name, " ", employee.last_name) AS manager
-- FROM employee);

-- CREATE TABLE employee AS
-- (SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
-- CONCAT(employee.first_name, " ", employee.last_name) AS manager
-- FROM ((employee
-- INNER JOIN department ON employee.id = department.id)
-- INNER JOIN role ON employee.role_id = role.id)
-- LEFT JOIN employee ON employee.manager_id = employee.id);


SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary,
CONCAT(mgr.first_name, " ", mgr.last_name) AS manager
FROM employee emp
LEFT JOIN employee mgr ON emp.manager_id = mgr.id
INNER JOIN department ON emp.id = department.id
INNER JOIN role ON emp.role_id = role.id 