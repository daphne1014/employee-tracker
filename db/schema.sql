DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NULL
);
CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30)  NULL,
  role_id INTEGER,
  CONSTRAINT id PRIMARY KEY(id) ,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INTEGER NULL,
  CONSTRAINT manager_id
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);