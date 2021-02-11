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

-- CREATE TABLE W/ INFO IN IT!!