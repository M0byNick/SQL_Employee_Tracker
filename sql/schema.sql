DROP DATABASE IF EXISTS employeesDB;

/*Setting up database*/
CREATE DATABASE employeesDB;
USE employeesDB;

/*Table structure*/
CREATE TABLE employee (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleID INT,
    managerID INT NULL,
    CONSTRAINT foreignKEYROLE FOREIGN KEY (roleID) REFERENCES role(roelID) ON DELETE CASCADE;
    CONSTRAINT foreignKEYMANAGER FOREIGN KEY (managerID) REFERENCES employee(employeeID) ON DELETE SET NULL
);

CREATE TABLE department (
    deptID INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(40) NULL
);

CREATE TABLE role (
    roleID INT AUTO_INCREMENT PRIMARY KEY,
    roleTitle VARCHAR(40) NULL,
    roleSalary DECIMAL NULL,
    deptID INT NULL,
    CONSTRAINT foreignKeyDepartment FOREIGN KEY (deptID) REFERENCES department(deptID) ON DELETE CASCADE
);