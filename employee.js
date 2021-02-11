const inquirer = require("inquirer");
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    promptUser();
  });

// ask user what they want to do, depending on what they want, take them there
// Add departments, roles, employees - View departments, roles, employees - Update employee roles

const promptUser = () =>{
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'question',
            choices: ['Add Departments', 'Add Roles', 'Add Employees', 
            'View Departments', "View Roles", "View Employees", 
            "Update Employee Roles", "End"],
        },
    ]).then((answer) => {
        if(answer.question === 'Add Departments') {
            //call function for add departments
        }
        if(answer.question === 'Add Roles') {
            //call function for add roles
        }
        if(answer.question === 'Add Employees') {
            //call function for Add Employees
        }
        if(answer.question === 'View Departments') {
            //call function for View Departments
        }
        if(answer.question === 'View Roles') {
            //call function for View Roles
        }
        if(answer.question === 'View Employees') {
            //call function for View Employees
        }
        if(answer.question === 'Update Employee Roles') {
            //call function for Update Employee Roles
        }
        if(answer.question === 'End') {
            //call function for End
        }
      })
} 

    
promptUser()



