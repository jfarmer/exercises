WITH years AS (
  SELECT EXTRACT(YEAR FROM years) AS year FROM generate_series('1900-01-1', '2024-01-01', INTERVAL '1 year') AS years
), directors AS (
  SELECT
    DISTINCT ON (person_id, movie_id)
    ci.person_id,
    ci.movie_id,
    t.title,
    t.production_year
  FROM cast_info ci
  JOIN role_type rt
    ON (rt.id = ci.role_id)
  JOIN title t
    ON (t.id = ci.movie_id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE rt.role = 'director'
    AND kt.kind = 'movie'
)
SELECT
  y.year,
  d.movie_id,
  LEAD(d.production_year) OVER (PARTITION BY d.person_id ORDER BY d.production_year ASC, d.movie_id ASC) AS next_year,
  LEAD(d.production_year) OVER (PARTITION BY d.person_id ORDER BY d.production_year ASC, d.movie_id ASC) - d.production_year AS diff,
  d.title
FROM years y
JOIN directors d
  ON (y.year = d.production_year AND d.person_id = 1476970)
ORDER BY y.year ASC, d.movie_id ASC;
