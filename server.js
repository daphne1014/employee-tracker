const db = require('./db/connection');
const mysql  = require('mysql2')

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'inventory_db'
    },
    console.log(`Connected to the inventory_db database.`)
  );

// Query database
//View All Departments
db.query(`SELECT * FROM department;`, function (err, results) {
    console.log(results);
  });

//View All Roles
db.query(`SELECT 
role.id, role.title,department.name as department, role.salary
FROM role
JOIN department ON role.department_id=department.id;`, function (err, results) {
    console.log(results);
  });

//View All Employees
db.query(`SELECT
-> e.id, e.first_name, e.last_name, role.title, department.name, role.salary, concat(m.first_name, m.last_name) AS manager
-> FROM employee e
-> JOIN role ON e.role_id=role.id
-> JOIN department on role.department_id = department.id
-> JOIN employee m ON m.id = e.manager_id;`, function (err, results) {
    console.log(results);
  });



