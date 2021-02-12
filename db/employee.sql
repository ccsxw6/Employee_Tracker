DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL(10, 4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30), 
  last_name VARCHAR(30),
  role_id INT NOT NULL, 
  manager_id INT NULL, 
  PRIMARY KEY (id)
);

--Department Table Information
INSERT INTO department (department_name) VALUES ('Marketing');
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Accounting');

--Employee Role Table Information
INSERT INTO employee_role (title, salary, department_id) VALUES ('Manager', '100,000', '1');
INSERT INTO employee_role (title, salary, department_id) VALUES ('Employee', '50,000', '2');


--Employee Personal Table Information
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Chris', 'Stanfill', '20', '30');
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('The', 'Donald', '21', '30');