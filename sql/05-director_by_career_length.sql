WITH movie_ratings AS (
  SELECT
    mii.movie_id AS movie_id,
    CAST(mii.info AS DECIMAL(3,1)) AS rating,
    CAST(mii2.info AS INTEGER) AS votes
  FROM movie_info_idx mii
  JOIN info_type it
    ON (it.id = mii.info_type_id AND it.info = 'rating')
  JOIN movie_info_idx mii2
    ON (mii2.movie_id = mii.movie_id)
  JOIN info_type it2
    ON (it2.id = mii2.info_type_id AND it2.info = 'votes')
), directors AS (
  SELECT
    DISTINCT ON (person_id, movie_id)
    ci.person_id,
    ci.movie_id,
    t.title,
    t.production_year,
    mr.rating,
    mr.votes
  FROM cast_info ci
  JOIN role_type rt
    ON (rt.id = ci.role_id)
  JOIN title t
    ON (t.id = ci.movie_id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  JOIN movie_ratings mr
    ON (mr.movie_id = ci.movie_id)
  WHERE rt.role = 'director'
    AND kt.kind = 'movie'
    AND mr.votes > 1000
)

SELECT
  n.id AS director_id,
  n.name AS director_name,
  MAX(d.production_year) AS last_year,
  MIN(d.production_year) AS first_year,
  MAX(d.production_year) - MIN(d.production_year) AS career_length
FROM directors d
JOIN name n
  ON (n.id = d.person_id)
GROUP BY n.id
ORDER BY career_length DESC
LIMIT 100;
