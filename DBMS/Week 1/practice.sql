-- Drop the database if it exists
DROP DATABASE IF EXISTS PHI_DB;

-- Create a new database
CREATE DATABASE PHI_DB;

-- Optional: use the database
USE PHI_DB;
CREATE TABLE Employee (
    EmployeeId INT PRIMARY KEY,
    EmployeeName VARCHAR(50),
    EmployeeSalary DECIMAL(10,2),
    JoiningDate DATE
);

INSERT INTO Employee (EmployeeId, EmployeeName, EmployeeSalary, JoiningDate)
VALUES
(1, 'John Doe', 50000.00, '2025-01-01'),
(2, 'Jane Smith', 60000.00, '2025-02-01');
DELETE FROM Employee
WHERE EmployeeId = 1;
