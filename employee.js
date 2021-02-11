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
            //break
        }
        if(answer.question === 'Add Roles') {
            //call function for add roles
            //break
        }
        if(answer.question === 'Add Employees') {
            //call function for Add Employees
            //break
        }
        if(answer.question === 'View Departments') {
            //call function for View Departments
            //break
        }
        if(answer.question === 'View Roles') {
            //call function for View Roles
            //break
        }
        if(answer.question === 'View Employees') {
            //call function for View Employees
            //break
        }
        if(answer.question === 'Update Employee Roles') {
            //call function for Update Employee Roles
            //break
        }
        if(answer.question === 'End') {
            //call function for End
            //break
        }
      })
} 

    
promptUser()



