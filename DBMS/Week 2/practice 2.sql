SELECT name, 
       (SELECT job_title 
        FROM jobs 
        WHERE jobs.job_id = employees.job_title) AS job_title
FROM employees;
SELECT employees.name, jobs.job_title
FROM employees
INNER JOIN jobs ON employees.job_title = jobs.job_id;

SELECT e.name, j.job_title, e.salary
FROM employees e
INNER JOIN jobs j ON e.job_title = j.job_id
WHERE e.salary = (SELECT MAX(salary) FROM employees);

SELECT e.name AS employee_name, m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
