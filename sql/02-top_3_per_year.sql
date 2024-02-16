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
), annual_rankings AS (
  SELECT
    t.id AS movie_id,
    t.production_year AS production_year,
    t.title AS movie_title,
    mr.rating AS movie_rating,
    mr.votes AS movie_votes,
    DENSE_RANK() OVER (
      PARTITION BY production_year
      ORDER BY mr.rating DESC, mr.votes DESC
    ) AS high_ranking
  FROM title t
  JOIN movie_ratings mr
    ON (mr.movie_id = t.id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE kt.kind = 'movie'
    AND mr.votes > 1000
  ORDER BY
    t.production_year ASC,
    mr.rating DESC,
    mr.votes DESC
), years AS (
  SELECT EXTRACT(YEAR FROM years) AS year
  FROM generate_series('1900-01-1', '2024-01-01', INTERVAL '1 year') AS years
)
SELECT
  COUNT(*) FILTER(WHERE ar.movie_title IS NOT NULL) OVER(PARTITION BY y.year) AS count,
  y.year,
  ar.high_ranking AS movie_rank,
  ar.movie_title,
  ar.movie_rating, ar.movie_votes
FROM years y
LEFT JOIN annual_rankings ar
  ON (y.year = ar.production_year AND ar.high_ranking <= 3)
ORDER BY
  y.year ASC,
  ar.movie_rating DESC,
  ar.movie_votes DESC;
