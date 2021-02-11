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


const promptUser = () => {
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
        if (answer.question === 'Add Departments') {
            addDepartment()
            //break?
        }
        if (answer.question === 'Add Roles') {
            addRoles()
            //break
        }
        if (answer.question === 'Add Employees') {
            addEmployees()
            //break
        }
        if (answer.question === 'View Departments') {
            viewDepartments()
            //break
        }
        if (answer.question === 'View Roles') {
            viewRoles()
            //break
        }
        if (answer.question === 'View Employees') {
            viewEmployees()
            //break
        }
        if (answer.question === 'Update Employee Roles') {
            updateEmployeeRoles()
            //break
        }
        if (answer.question === 'End') {
            console.log("Thank you!")
            // return or break? Or call promptuser again? 
        }
    })
}

const addDepartment = () => {
    // ask what dep they want to 
    // then need to call a function that will update the database with this information
    inquirer.prompt({
        type: 'input',
        message: 'What department would you like to add?',
        name: 'department',
    }).then((answer) => {
        // can this query variable be const here?? 
        const query = 'INSERT INTO department (department_name) VALUES (?)';
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log(`You have added ${answer.department} to Departments`)
            promptUser();
        });
    });
};

const addRoles = () => {
    inquirer.prompt([
    {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'role',
    },
    {
        type: 'input',
        message: 'What is the salary of this role?',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'What is the department id of this role?',
        name: 'dep_id',
    },
]).then((answer) => {
    const query = 'INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [answer.role], [answer.salary], [answer.dep_id], (err, res) => {
        if (err) throw err;
        console.log(`You have added ${answer.role} to Employee Roles`)
        promptUser();
    });
});
};

const addEmployees = () => {
        inquirer.prompt([
        {
            type: 'input',
            message: 'What is their first name?',
            name: 'first',
        },
        {
            type: 'input',
            message: 'What is their first name?',
            name: 'last',
        },
        {
            type: 'input',
            message: 'What is their role id?',
            name: 'role_id',
        },
        {
            type: 'input',
            message: 'What is their manager id?',
            name: 'manager_id',
        },
    ]).then((answer) => {
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [answer.first], [answer.last], [answer.role_id], [answer.manager_id], (err, res) => {
            if (err) throw err;
            console.log(`You have added ${answer.first} ${answer.last} as an employee`)
            promptUser();
        });
    });
    };


const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(res)
    })
};

const viewRoles = () => {
    connection.query('SELECT * FROM employee_role', (err, res) => {
        if (err) throw err;
        console.log(res)
    })
};

const viewEmployees = () => {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res)
    })
};

// STOPPED HERE
const updateEmployeeRoles = () => {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res)
    })
};