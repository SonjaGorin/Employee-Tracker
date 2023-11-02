SELECT role.id, role.title, role.salary, department.name
FROM role
JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department, role.salary
FROM employee
JOIN role ON employee.role_id = role.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department, role.salary, employee.id
FROM employee
JOIN role ON employee.manager_id = employee.id;