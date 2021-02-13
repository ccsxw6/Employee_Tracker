// Dependencies
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "employee_trackerDB",
});

connection.connect((err) => {
	if (err) throw err;
});


const promptUser = () => {
  inquirer.prompt({
      type: "list",
      name: "question",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "view all roles",
        "view all departments",
        "add employee",
        "add department",
        "add role",
        "update employee role",
        "remove employee"
      ]
    }).then((answer) => {
      console.log(answer);
      switch (answer.question) {
        case "view all employees":
          viewallEmployeesloyees();
          break;

        case "view all roles":
          viewallroles();
          break;

        case "view all departments":
          viewalldepartments();
          break;

        case "add employee":
          addEmployee();
          break;

        case "update employee role":
          updateEmpRole();
          break;

        case "add department":
          addDepartment();
          break;

        case "add role":
          addRole();
          break;
      }
    });
};
promptUser();


const viewalldepartments = () => {
  connection.query("SELECT * FROM department", (err, answer) => {
    console.table(answer);
  });
  promptUser();
}


const viewallroles = () => {
  connection.query("SELECT * FROM role", (err, answer) => {
    console.table(answer);
  });
  promptUser();
}


const viewallEmployeesloyees = () => {
  console.log("retrieving employess from database");
  var fancyQuery =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  connection.query(fancyQuery, (err, answer) => {
    console.table(answer);
  });
  promptUser();
}


const addEmployee = () =>  {
  inquirer.prompt([
      {
        type: "input",
        message: "Enter employee first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter employee last name",
        name: "lastName"
      }
    ]).then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: null,
          manager_id: null
        },
        (err, answer) => {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      promptUser();
    });
}


const updateEmpRole = () =>  {
  let allEmployees = [];
  connection.query("SELECT * FROM employee", function(err, answer) {
    for (let i = 0; i < answer.length; i++) {
      let stringOfEmployees =
        answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
      allEmployees.push(stringOfEmployees);
    }
    inquirer.prompt([
        {
          type: "list",
          name: "udpateRole",
          message: "select employee to update role",
          choices: allEmployees
        },
        {
          type: "list",
          message: "select new role",
          choices: ["manager", "employee"],
          name: "newrole"
        }
      ]).then((answer) =>  {
        console.log("about to update", answer);
        const idToUpdate = {};
        idToUpdate.employeeId = parseInt(answer.udpateRole.split(" ")[0]);
        if (answer.newrole === "manager") {
          idToUpdate.role_id = 1;
        } else if (answer.newrole === "employee") {
          idToUpdate.role_id = 2;
        }
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [idToUpdate.role_id, idToUpdate.employeeId],
          (err, data) => {
            promptUser();
          }
        );
      });
  });
}


const addDepartment = () =>  {
  inquirer
    .prompt({
      type: "input",
      message: "enter department name",
      name: "department"
    }).then((answer) =>  {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        (err, answer) => {
          if (err) {
            throw err;
          }
        }
      ),
        console.table(answer);
      promptUser();
    });
}


const addRole = () =>  {
  inquirer.prompt([
      {
        type: "input",
        message: "enter employee title",
        name: "addtitle"
      },
      {
        type: "input",
        message: "enter employee salary",
        name: "addsalary"
      },
      {
        type: "input",
        message: "enter employee department id",
        name: "addDepId"
      }
    ]).then((answer) =>  {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addDepId
        },
        (err, answer) => {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      promptUser();
    });
}