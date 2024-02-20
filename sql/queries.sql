-- Below are a bunch of "plain English" sentences.  Your job is to take a stab
-- at translating each one into a single SELECT query.  You can write your
-- query below each "plain English" sentence.

-- Some things to keep in mind about the `imdb` schema:
--
-- 1. The `title` table contains information about ALL entities on IMDb:
--    movies, TV shows, miniseries, etc. You have to join other tables if you
--    only want to look at one type of media.
--
-- 2. The IMDb database contains lots of no-name movies. It can help to
--    preemptively filtering the set of movies you're querying by the number of
--    votes, e.g., only look at movies with at least 200 votes.

-- QUERIES --

-- The highest-rated and lowest-rated movies per year, with ties
-- broken by highest number of votes.

-- TODO: Add lowest-rated movie per year
-- Other issues w/ this query
-- The vote cutoff is arbitrary
-- Ideas:
--   Somehow include range of cutoffs to see effect of cutoff
--   Determine cutoff dynamically somehow, e.g., movies with more-than-median number of votes for that year

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
    ) AS annual_ranking
  FROM title t
  JOIN movie_ratings mr
    ON (mr.movie_id = t.id)
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE kt.kind = 'movie'
    AND mr.votes > 1000
  ORDER BY
    t.production_year,
    mr.rating DESC,
    mr.votes DESC
), years AS (
  SELECT EXTRACT(YEAR FROM years) AS year FROM generate_series('1900-01-1', '2024-01-01', INTERVAL '1 year') AS years
)
SELECT
  y.year, ar.movie_title, ar.movie_rating, ar.movie_votes
FROM years y
LEFT JOIN annual_rankings ar
  ON (y.year = ar.production_year AND ar.annual_ranking = 1);

-- The 3 highest-rated movies per year, with ties broken by highest
-- number of votes.

-- Directors by highest-rated first movie

-- All directors whose first movie was rated higher than the median
-- first movie

-- Directors by length of career, as measured by difference in
-- release of the first movie and last movie

-- Movies with sequels sorted by the biggest difference in rating
-- between the first and second movies.

-- Director/actor collaborations, ordered by numbers of times they
-- collaborated

-- Produce a "collaboration matrix" for a given director.
-- Have one column per film directed and one row per actor they
-- collaborated with. Put a '1'/'t'/etc. in a cell if the corresponding
-- actor starred in that film and a '0'/'f'/etc. if they didn't.
-- Feel free to limit the number of rows to the "Top 5" or "Top N" collaborators.
