SELECT
  t.id,
  COUNT(*) AS count,
FROM
  cast_info ci
  JOIN role_type rt
    ON (rt.id = ci.role_id)
  JOIN title t
    ON (t.id = ci.movie_id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
WHERE
  rt.role = 'director'
  AND kt.kind = 'movie'
GROUP BY t.id
ORDER BY count DESC;

SELECT
  t.id,
  CAST(mii.info AS numeric) AS votes,
  mii.info,
  COUNT(*) AS count
FROM
  cast_info ci
JOIN role_type rt
  ON (rt.id = ci.role_id)
JOIN title t
  ON (t.id = ci.movie_id)
JOIN kind_type kt
  ON (kt.id = t.kind_id)
JOIN movie_info_idx mii
  ON (mii.movie_id = ci.movie_id)
JOIN info_type it
  ON (it.id = mii.info_type_id)
WHERE
  it.info = 'votes'
  AND rt.role = 'director'
  AND kt.kind = 'movie'
GROUP BY t.id, votes
ORDER BY count DESC;

SELECT
  t.id AS movie_id,
  t.title AS movie_title,
  CAST(mii.info AS numeric) AS votes,
  COUNT(*) AS count
FROM
  cast_info ci
JOIN role_type rt
  ON (rt.id = ci.role_id)
JOIN title t
  ON (t.id = ci.movie_id)
JOIN kind_type kt
  ON (kt.id = t.kind_id)
JOIN movie_info_idx mii
  ON (mii.movie_id = ci.movie_id)
JOIN info_type it
  ON (it.id = mii.info_type_id)
WHERE
  it.info = 'votes'
  AND rt.role = 'director'
  AND kt.kind = 'movie'
  AND mii.info_type_id <> 99
GROUP BY t.id, votes
HAVING CAST(mii.info AS numeric) > 100 AND COUNT(*) > 1
ORDER BY votes DESC;

SELECT
  t.id,
  CAST(mii.info AS numeric) AS votes,
  COUNT(*) AS count
FROM
  cast_info ci
JOIN role_type rt
  ON (rt.id = ci.role_id)
JOIN title t
  ON (t.id = ci.movie_id)
JOIN kind_type kt
  ON (kt.id = t.kind_id)
JOIN movie_info_idx mii
  ON (mii.movie_id = ci.movie_id)
JOIN info_type it
  ON (it.id = mii.info_type_id)
WHERE
  it.info = 'votes'
  AND rt.role = 'director'
  AND kt.kind = 'movie'
  AND mii.info_type_id <> 99
  AND CAST(mii.info AS numeric) > 200
GROUP BY t.id, votes
ORDER BY votes DESC;
