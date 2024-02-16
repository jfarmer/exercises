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
), median_ratings AS (
  SELECT
    t.production_year,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY mr.rating ASC) AS median_rating
  FROM movie_ratings mr
  JOIN title t
    ON (t.id = mr.movie_id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE kt.kind = 'movie'
  GROUP BY t.production_year
), directors AS (
  SELECT
    DISTINCT ON (person_id, movie_id)
    ci.person_id,
    ci.movie_id,
    t.title,
    t.production_year,
    mr.rating,
    mr.votes,
    DENSE_RANK() OVER (PARTITION BY ci.person_id ORDER BY t.production_year ASC) AS movie_order
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
  n.name AS director_name,
  d.title AS movie_title,
  d.production_year,
  d.rating,
  d.votes
FROM directors d
JOIN name n
  ON (n.id = d.person_id)
JOIN median_ratings mr
  ON (mr.production_year = d.production_year)
WHERE d.movie_order = 1
  AND d.rating > mr.median_rating
ORDER BY d.rating DESC, d.votes DESC, director_name ASC;
