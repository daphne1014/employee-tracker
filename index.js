const inquirer = require('inquirer');

const promptMain = () =>{
    inquirer.prompt({
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices:['View All Departments',
        'View All Roles',
        'View All Employees', 'Add a Department', 'Add a Role',
        'Add an Employee', 'Remove Employee', 'Update an Employee Role']
    })
    .then((answers) => {
        if(answers.main === 'View All Employees'){
            console.log(answers.main);
        } else if (answers.main === 'View All Employees by Department'){
            console.log(answers.main);
        } else if (answers.main === 'View All Employees by Manager'){
            console.log(answers.main);
        } else if (answers.main === 'Add Employee'){
            console.log(answers.main);
        } else if (answers.main === 'Remove Employee'){
            console.log(answers.main);
        } else if (answers.main === 'Update Employee Role'){
            console.log(answers.main);
        } else if (answers.main === 'Update Employee Manager'){
            console.log(answers.main);
        }
    })
};

//viewing all employees
