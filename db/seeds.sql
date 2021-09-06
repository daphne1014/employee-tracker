INSERT INTO department (name)
VALUES
('Company'),
('Human Resources'),
('Marketing'),
('IT'),
('Logistics'),
('Sales'),
('Finance');

INSERT INTO role (title,salary,department_id)
VALUES
('CEO', 100000, 1),
('HR Manager', 80000, 2),
('Marketing Manager',70000,3),
('Sr. Software Developer', 120000, 4),
('Jr. Software Developer', 90000, 4),
('HR Specialist', 60000, 2),
('Accountant', 60000, 7),
('Finance Manager', 80000,7);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
('Meredith','Grey',1,NULL),
('Christina','Yang', 7, 1),
('Jo','Wilson',4,1),
('Derek','Shepherd',3,2),
('Izzie','Stevens',2,3),
('Alex', 'Karev',5,2);