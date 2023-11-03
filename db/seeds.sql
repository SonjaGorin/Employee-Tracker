-- values to insert into tables

INSERT INTO department (name)
VALUES  ("Communications"),
        ("Finance"),
        ("Human Resources"),
        ("Learning Support Services"),
        ("Early Learning");


INSERT INTO role (title, salary, department_id)
VALUES  ("Executive Officer", 85000, 1),
        ("Assistant Treasurer", 55000, 2),
        ("General Manager of HR", 80000, 3),
        ("Superintendent", 65000, 4),
        ("Program Supervisor", 70000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Aaron", "Hotchner", 3, null);
        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Spencer", "Reid", 1, 1),
        ("Penelope", "Garcia", 2, 1),
        ("Jennifer", "Jareau", 4, 1),
        ("Jason", "Gideon", 5, null);