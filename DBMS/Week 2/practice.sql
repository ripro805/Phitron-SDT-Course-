-- Complete solution for the subquery error and additional queries

-- Solution 1: Use LIMIT to get only one Steven
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date > (
    SELECT hire_date
    FROM employees
    WHERE first_name = 'Steven'
    LIMIT 1
)
ORDER BY hire_date;

-- Solution 2: Get the earliest Steven hire date
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date > (
    SELECT MIN(hire_date)
    FROM employees
    WHERE first_name = 'Steven'
)
ORDER BY hire_date;

-- Solution 3: Get the latest Steven hire date
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date > (
    SELECT MAX(hire_date)
    FROM employees
    WHERE first_name = 'Steven'
)
ORDER BY hire_date;

-- Solution 4: Use specific employee_id for Steven King
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date > (
    SELECT hire_date
    FROM employees
    WHERE employee_id = 100  -- Steven King's ID
)
ORDER BY hire_date;

-- Additional diagnostic queries:

-- Find all employees named Steven to understand the data
SELECT employee_id, first_name, last_name, hire_date
FROM employees
WHERE first_name = 'Steven'
ORDER BY hire_date;

-- Alternative approach using JOIN (doesn't cause subquery error)
SELECT e.first_name, e.last_name, e.hire_date
FROM employees e
CROSS JOIN (
    SELECT MIN(hire_date) as steven_hire_date
    FROM employees
    WHERE first_name = 'Steven'
) s
WHERE e.hire_date > s.steven_hire_date
ORDER BY e.hire_date;

-- Count how many employees are returned by each method
SELECT 
    'After Earliest Steven' as method,
    COUNT(*) as employee_count
FROM employees
WHERE hire_date > (
    SELECT MIN(hire_date)
    FROM employees
    WHERE first_name = 'Steven'
)
UNION ALL
SELECT 
    'After Latest Steven' as method,
    COUNT(*) as employee_count
FROM employees
WHERE hire_date > (
    SELECT MAX(hire_date)
    FROM employees
    WHERE first_name = 'Steven'
);

-- Get the 3rd highest salary using DENSE_RANK (from your existing query)
WITH SalaryRank AS (
    SELECT 
        first_name,
        last_name,
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS sal_rank
    FROM employees
)
SELECT first_name, last_name, salary
FROM SalaryRank
WHERE sal_rank = 3;

-- Get the 3rd lowest salary using DENSE_RANK (from your existing query)
WITH SalaryRank AS (
    SELECT 
        first_name,
        last_name,
        salary,
        DENSE_RANK() OVER (ORDER BY salary ASC) AS sal_rank
    FROM employees
)
SELECT first_name, last_name, salary
FROM SalaryRank
WHERE sal_rank = 3;

-- Additional useful query: Show all employees with their hire dates compared to Stevens
SELECT 
    e.first_name,
    e.last_name,
    e.hire_date,
    (SELECT MIN(hire_date) FROM employees WHERE first_name = 'Steven') as first_steven_hire,
    (SELECT MAX(hire_date) FROM employees WHERE first_name = 'Steven') as last_steven_hire,
    CASE 
        WHEN e.hire_date > (SELECT MAX(hire_date) FROM employees WHERE first_name = 'Steven') THEN 'Hired after all Stevens'
        WHEN e.hire_date > (SELECT MIN(hire_date) FROM employees WHERE first_name = 'Steven') THEN 'Hired after first Steven'
        ELSE 'Hired before or with first Steven'
    END as hire_status
FROM employees e
ORDER BY e.hire_date;