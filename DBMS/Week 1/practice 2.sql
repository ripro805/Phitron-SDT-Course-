-- ========================================
-- 1️⃣ Drop existing tables if they exist
-- ========================================
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS EmployeeProject;

-- ========================================
-- 2️⃣ Create Employee Table with Constraints
-- ========================================
CREATE TABLE Employee (
    EmpId INT PRIMARY KEY,
    EmpName VARCHAR(50) NOT NULL,
    JoiningYear YEAR NOT NULL,
    Birthday DATE CHECK (YEAR(Birthday) <= 2000),
    Designation VARCHAR(50) NOT NULL,
    Salary DECIMAL(10,2) CHECK (Salary > 0)
);

-- ========================================
-- 3️⃣ Insert Sample Employee Data
-- ========================================
INSERT INTO Employee (EmpId, EmpName, JoiningYear, Birthday, Designation, Salary)
VALUES
(1, 'John Doe', 2015, '1995-06-15', 'Manager', 75000.00),
(2, 'Jane Smith', 2018, '1998-09-20', 'Developer', 60000.00),
(3, 'Alice Brown', 2020, '2000-01-10', 'Designer', 55000.00),
(4, 'Bob White', 2019, '1997-12-05', 'Tester', 50000.00);

-- ========================================
-- 4️⃣ Composite Primary Key Example
-- ========================================
CREATE TABLE EmployeeProject (
    EmpId INT,
    ProjectId INT,
    AssignmentDate DATE,
    PRIMARY KEY (EmpId, ProjectId)
);

-- Insert sample data into EmployeeProject
INSERT INTO EmployeeProject (EmpId, ProjectId, AssignmentDate)
VALUES
(1, 101, '2023-01-10'),
(1, 102, '2023-03-15'),
(2, 101, '2023-02-05');

-- ========================================
-- 5️⃣ Demonstrate LIMIT + OFFSET
-- ========================================
-- Using LIMIT with OFFSET
SELECT * FROM Employee
LIMIT 2 OFFSET 1;

-- Using LIMIT with two numbers (OFFSET, COUNT)
SELECT * FROM Employee
LIMIT 1, 2;
