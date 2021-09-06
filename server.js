const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


// promptMain server after DB connection
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
      'Update an Employee Role',
      'Done']
  })
    .then((answer) => {
      if (answer.main === 'View All Departments') {
        viewDept();
      } else if (answer.main === 'View All Roles') {
        viewRole();
      } else if (answer.main === 'View All Employees') {
        viewEmployee();
      } else if (answer.main === 'Add a Department') {
        addDept();
      } else if (answer.main === 'Add a Role') {
        addRole();
      } else if (answer.main === 'Add an Employee') {
        addEmployee();
      } else if (answer.main === 'Remove an Employee') {
        removeEmployee();
      } else if (answer.main === 'Update an Employee Role') {
        updateEmployee();
      } else if (answer.main === 'Done') {
        console.log("Good Bye!");
        db.end();
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
    promptMain();
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
    promptMain();
  });
}

// //View All Employees

const viewEmployee = () => {
  const sql = `SELECT
   e.id, e.first_name, e.last_name, role.title, department.name, role.salary, concat(m.first_name, m.last_name) AS manager
   FROM employee e
  JOIN role ON e.role_id=role.id
 JOIN department on role.department_id = department.id
 JOIN employee m ON m.id = e.manager_id;`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
    promptMain();
  });
};

//Add a department

const addDept = () => {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What is the name of department you want to add?"
  })
    .then((answer) => {
      const sql = `INSERT INTO department(name) VALUES(?)`;
      db.query(sql, answer.department, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`${answer.department} successfully added!`);
      })
    }
    )
};

// Add a Role

const addRole = () => {
  inquirer.prompt([{
    name: "title",
    type: "input",
    message: "What role would you like to add?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter a role title."
      }
      return true;
    }
  },
  {
    name: "salary",
    type: "input",
    message: "What is the salary for this role?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter a salary."
      }
      return true;
    }
  },
  {
    name: "department_id",
    type: "input",
    message: "What is the department ID for this role?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter a department ID."
      }
      return true;
    }
  }])
    .then((answer) => {
      const sql = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
      const params = [answer.title, answer.salary, answer.department_id];
      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`Role successfully added!`);
        promptMain();
      })
    }
    )
};

//Add an Employee

const addEmployee = () => {
  inquirer.prompt([{
    name: "first_name",
    type: "input",
    message: "What is the employee's first name?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter the person's first name."
      }
      return true;
    }
  },
  {
    name: "last_name",
    type: "input",
    message: "What is the employee's last name?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter the person's last name."
      }
      return true;
    }
  },
  {
    name: "role_id",
    type: "input",
    message: "What is the employee's role ID?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter a role ID."
      }
      return true;
    }
  },
  {
    name: "manager_id",
    type: "input",
    message: "What is the manager's ID?"
  }])
    .then((answer) => {
      const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`Employee successfully added!`);
        promptMain();
      })
    }
    )
};

//Remove an Employee

const removeEmployee = () => {
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "What is ID of the employee you want to remove?"
  })
    .then((answer) => {
      const sql = `DELETE FROM employee WHERE id = ?`;
      const params = [answer.id];
      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`Employee successfully deleted!`);
        promptMain();
      })
    }
    )
};

//Update an Employee Role

const updateEmployee = () => {
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "What is ID of the employee you want to update?"
  },
  {
    name: "role_id",
    type: "input",
    message: "What is the employee's new role ID?",
    validate: answer => {
      if (answer.length < 1) {
        return "Please enter a role ID."
      }
      return true;
    }
  }
  ])
    .then((answer) => {
      const sql = `UPDATE employee SET role_id = ? 
      WHERE id = ?`;
      const params = [answer.role_id, answer.id];
      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(`Employee successfully updated!`);
        promptMain();
      })
    }
    )
};

promptMain();