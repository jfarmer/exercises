# Exercises: Advanced SQL Features

## Contents <!-- omit in toc -->

- [Queries](#queries)
- [Advanced SQL Features](#advanced-sql-features)
  - [Common Table Expressions](#common-table-expressions)
  - [Window Functions](#window-functions)
  - [`LATERAL` Joins](#lateral-joins)

## Queries

See [./queries.sql](./queries.sql) for exercises.

## Advanced SQL Features

### Common Table Expressions

Common Table Expressions (CTEs) allow you to define named subqueries, set apart from the rest of the query. They can be used multiple times in a query and PostgreSQL can take advantage of that. Their main benefit is probably improved readability, though.

See [the official PostgreSQL CTE tutorial](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cte/).

CTEs are defined using `WITH ... AS ( ... )`.

**Note**: There's no `;` after the CTE definition. It's part of the statement.

```sql
WITH movies AS (
  SELECT *
  FROM title t
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE kt.kind = 'movies'
)
SELECT
  movies.production_year,
  COUNT(*) per_year
FROM movies
GROUP BY production_year;
```

You can define multiple CTEs, but each `WITH ... AS (...)` clause has to be separated by a comma (`,`), like so:

```sql
WITH first_cte AS (
  SELECT ...
), second_cte AS (
  SELECT ...
), third_cte AS (
  SELECT ...
)

SELECT ...;
```

### Window Functions

Window functions allow you to perform calculations on other rows in the result set that are somehow related to the current row. Think of them as a dynamic way to add "rolling computations" to a query, without having to iterate over the result set again. What does that mean?

In code, imagine you had an array of results that you were iterating through for the purpose of displaying. You sorted the results in some particular way and wanted to include the *rank* of each row in that sort. Or imagine each result had a `user_id` and a `created_at` timestamp associated with it. You want to calculate the difference between consequtive `created_at` timestamps *for the same user* and include that in your display, e.g., time since last event (per user).

For each thing you want to computer like this, you could create the results and then iterate over it again, once for each piece of information you want to add. That's not great if the result set is large or there are many additional "extra fields" you want to perform.

So, you might feel compelled to modify the original iteration to calculate the additional information "as you go", so that you only iterate over the full result set once.

That's the spirit of window functions.

See:

- PostgreSQL Window Function Tutorial: <https://www.postgresql.org/docs/current/tutorial-window.html>
- PostgreSQL Window Function Documentation: <https://www.postgresql.org/docs/current/functions-window.html>

### `LATERAL` Joins

See <https://www.heap.io/blog/postgresqls-powerful-new-join-type-lateral> and <https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-LATERAL>

`LATERAL` joins are kind of like a "for each" loop. If you've ever wanted to join AT MOST a certain number of row then `LATERAL` allows you to do this.

This effectively lets you call a function for each row in the outer query. That function might be a correlated subquery, allowing you to reference outer fields in the inner query.

It's one way to compute "Top N" queries.

For example, if we wanted the 3 most recent comments from each user, we might write a query like this:

```sql
SELECT
  u.id AS user_id,
  u.email AS user_email,
  uc.created_at AS comment_created_at,
  uc.content AS comment_content
FROM users u
JOIN LATERAL (
  SELECT *
  FROM comments c
  WHERE c.user_id = u.id
  ORDER BY c.created_at DESC
  LIMIT 3
) uc ON true;
```
