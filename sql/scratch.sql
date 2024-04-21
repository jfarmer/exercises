WITH director_collaborations AS (
  SELECT
    ci.movie_id AS movie_id,
    ci.person_id AS director_id,
    actors.person_id AS actor_id
  FROM cast_info ci
  JOIN role_type rt_dir
    ON (rt_dir.id = ci.role_id)
  JOIN (
    SELECT
      ci2.movie_id, ci2.person_id
    FROM cast_info ci2
    JOIN role_type rt_act
      ON (rt_act.id = ci2.role_id)
    WHERE rt_act.role IN ('actor', 'actress')
  ) AS actors
    ON (actors.movie_id = ci.movie_id)
  WHERE
    rt_dir.role = 'director'
), movies_with_200_votes AS (
  SELECT
    mii.movie_id AS movie_id,
    t.title AS title,
    CAST(mii.info AS numeric) AS votes
  FROM title t
  JOIN movie_info_idx mii
    ON (mii.movie_id = t.id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  JOIN info_type it
    ON (it.id = mii.info_type_id)
  WHERE
  it.info = 'votes'
  AND kt.kind IN ('movie')
  AND mii.info_type_id <> 99
  AND CAST(mii.info AS numeric) > 50
), ranked_collaborations AS (
  SELECT
    director.id AS director_id,
    director.name AS director_name,
    actor.id AS actor_id,
    actor.name AS actor_name,
    m.movie_id AS movie_id,
    COUNT(*) OVER (PARTITION BY director.id, actor.id) AS times_worked_together
  FROM movies_with_200_votes m
  JOIN director_collaborations dc
    ON (dc.movie_id = m.movie_id)
  JOIN name AS director
    ON (director.id = dc.director_id)
  JOIN name AS actor
    ON (actor.id = dc.actor_id)
)
SELECT
  r.movie_id,
  r.director_id,
  r.director_name,
  r.actor_id,
  r.actor_name,
  r.times_worked_together,
FROM ranked_collaborations r
JOIN title t
  ON (t.id = r.movie_id)
ORDER BY collaborator_rank DESC;


WITH director_collaborations AS (
  SELECT
    ci.movie_id AS movie_id,
    ci.person_id AS director_id,
    actors.person_id AS actor_id
  FROM cast_info ci
  JOIN role_type rt_dir
    ON (rt_dir.id = ci.role_id)
  JOIN (
    SELECT
      ci2.movie_id, ci2.person_id
    FROM cast_info ci2
    JOIN role_type rt_act
      ON (rt_act.id = ci2.role_id)
    WHERE rt_act.role IN ('actor', 'actress')
  ) AS actors
    ON (actors.movie_id = ci.movie_id)
  WHERE
    rt_dir.role = 'director'
)

SELECT kt.kind, t.title, dc.director_id, dc.actor_id, mii.info AS votes
FROM director_collaborations dc
JOIN title t
  ON (t.id = dc.movie_id)
JOIN kind_type kt
  ON (kt.id = t.kind_id)
JOIN movie_info_idx mii
  ON (mii.movie_id = t.id)
JOIN info_type it
  ON (it.id = mii.info_type_id)
WHERE
  dc.director_id = 30393
  AND dc.actor_id = 2174210
  AND it.info = 'votes';

  SELECT
  t.id,
  CAST(mii.info AS DECIMAL(3,1)) AS rating,
  CAST(mii2.info AS INTEGER) AS votes
FROM
  title t
  JOIN movie_info_idx mii
    ON (mii.movie_id = t.id)
  JOIN info_type it
    ON (it.id = mii.info_type_id AND it.info='rating')
  JOIN movie_info_idx mii2
    ON (mii2.movie_id = t.id)
  JOIN info_type it2
    ON (it2.id = mii2.info_type_id AND it2.info='votes');
