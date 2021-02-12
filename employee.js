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
        switch (answer.question) {
            case 'Add Departments':
                addDepartment();
                break;

            case 'Add Roles':
                addRoles();
                break;

            case 'Add Employees':
                addEmployees()
                break

            case 'View Departments':
                viewDepartments()
                break

            case 'View Roles':
                viewRoles()
                break

            case 'View Employees':
                viewEmployees()
                break

            case 'Update Employee Roles':
                updateEmployeeRoles()
                break

            case 'End':
                console.log("Thank you!")
                promptUser()
        }
    })
}

const addDepartment = () => {
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



const updateEmployeeRoles = () => {
    let allEmployees = [];
    connection.query('SELECT * FROM employees', (err, res) => {
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            let employeeString =
                res[i].first_name + " " + res[i].last_name + " " + res[i].role_id + " " + res[i].manager_id;
            allEmployees.push(employeeString);
        }
        // console.log(allEmployees)
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "selectEmp",
                    message: "Select employee to update role",
                    choices: allEmployees
                },
                {
                    type: "list",
                    name: "newRole",
                    message: "Select new role",
                    choices: ["Manager", "Employee"]
                }
            ])
            .then(function (answer) {
                console.log("Updating", answer);

                const updateId = {};
                updateId.employeeId = parseInt(answer.selectEmp.split(" ")[0]);

                if (answer.newRole === "Manager") {
                    updateId.role_id = 1;
                } else if (answer.newRole === "Employee") {
                    updateId.role_id = 2;
                }
                connection.query(
                    "UPDATE employee SET role_id = ? WHERE id = ?",
                    [updateId.role_id, updateId.employeeId],
                    function (err, data) {
                        promptUser();
                    }
                );
            });
    });
}


  //CHANGED ROLE TABLE, MAKE SURE EVERYTHING LINES UP WITH THAT AFTER FINISHING UPDATE FUNCTION
  // Change password in mysql