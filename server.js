const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

const promptMain = () => {
  inquirer.prompt({
    type: 'list',
    name: 'main',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Remove an Employee',
      'Update an Employee Role']
  })
    .then((answers) => {
      if (answers.main === 'View All Departments') {
        viewDept();
      } else if (answers.main === 'View All Roles') {
        viewRole();
      } else if (answers.main === 'View All Employees') {
        viewEmployee();
      } else if (answers.main === 'Add a Department') {
        addDept();
      } else if (answers.main === 'Add a Role') {
        addRole();
      } else if (answers.main === 'Add an Employee') {
        addEmployee();
      } else if (answers.main === 'Remove an Employee') {
        removeEmployee();
      } else if (answers.main === 'Update an Employee Role') {
        updateEmployee();
      }
    })
};

// // Query database
// //View All Departments

const viewDept = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
    start();
  });
};

// //View All Roles

const viewRole = () => {
  const sql = `SELECT 
  role.id, role.title,department.name as department, role.salary
  FROM role
  JOIN department ON role.department_id=department.id`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
    start();
  });
}

// //View All Employees

const viewEmployee = () => {
  const sql = `SELECT
  -> e.id, e.first_name, e.last_name, role.title, department.name, role.salary, concat(m.first_name, m.last_name) AS manager
  -> FROM employee e
  -> JOIN role ON e.role_id=role.id
  -> JOIN department on role.department_id = department.id
  -> JOIN employee m ON m.id = e.manager_id`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
    start();
  });
};

// //Add a department

const addDept = () => {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What is the name of department you want to add?"
  })
    .then((answers) => {
      const sql = `INSERT INTO department(name) VALUES(?)`;
      db.query(sql, answers.department, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`${answer.department} successfully added!`);
      })
    }
    )
};


// //Add an employee


// //Remove an Employee

// //Update an Employee Role