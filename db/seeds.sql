INSERT INTO department (name)
VALUES
('Human Resources'),
('Marketing'),
('IT'),
('Logistics'),
('Sales'),
('Finance');

INSERT INTO role (title,salary,department_id)
VALUES
('HR Manager', 80000, 1),
('Marketing Manager',70000,2),
('Sr. Software Developer', 120000, 3),
('Jr. Software Developer', 90000, 3),
('HR Specialist', 60000, 1),
('Accountant', 60000, 6),
('Finance Manager', 80000,6);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
('Meredith','Grey',1,NULL),
('Christina','Yang', 7, NULL),
('Jo','Wilson',4,NULL),
('Derek','Shepherd',3,NULL),
('Izzie','Stevens',2,NULL),
('Alex', 'Karev',5,2);