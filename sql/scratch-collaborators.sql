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
  ORDER BY movie_id, person_id
), actors AS (
  SELECT
    DISTINCT ON (movie_id, person_id)
    ci2.movie_id, ci2.person_id
  FROM cast_info ci2
  JOIN role_type rt_act
    ON (rt_act.id = ci2.role_id)
  JOIN title t
    ON (t.id = ci2.movie_id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE rt_act.role IN ('actor', 'actress')
    AND kt.kind = 'movie'
  ORDER BY movie_id, person_id
), director_collaborations AS (
  SELECT
    DISTINCT ON (movie_id, director_id, actor_id)
    d.person_id AS director_id,
    a.person_id AS actor_id,
    d.movie_id AS movie_id
  FROM directors d
  JOIN actors a
    ON (a.movie_id = d.movie_id)
), ranked_collaborations AS (
  SELECT
    dc.director_id AS director_id,
    dc.actor_id AS actor_id,
    dc.movie_id AS movie_id,
    COUNT(*) OVER (PARTITION BY director_id, actor_id) AS times_worked_together
  FROM director_collaborations dc
)
SELECT
  r.movie_id,
  r.director_id,
  director.name AS director_name,
  r.actor_id,
  actor.name AS actor_name,
  r.times_worked_together
FROM ranked_collaborations r
JOIN name AS director
  ON (director.id = r.director_id)
JOIN name AS actor
  ON (actor.id = r.actor_id)
ORDER BY times_worked_together DESC
LIMIT 500;
