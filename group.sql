CREATE MACRO with_prefix (col, prefix) AS case when col is null then '' else prefix || col end;

create table style_key_count as 
  select 種別1, count(*) as cnt
  from 'download.csv'
  group by 種別1
;

create table out as

with main as (
  SELECT
    inp.所在地,
    --
    FIRST(inp.経度) AS 経度,
    FIRST(inp.緯度) AS 緯度,
    FIRST(inp.文化財種類) AS 文化財種類,
    FIRST(inp.種別1) AS 種別1,
    FIRST(inp.種別2) AS 種別2,
    FIRST(inp.時代) AS 時代,
    FIRST(inp.重文指定年月日) AS 重文指定年月日,
    FIRST(inp.国宝指定年月日) AS 国宝指定年月日,
    --
    (case when COUNT(*) >= 2 then COUNT(*) || '件:' else '' end) ||
      STRING_AGG(DISTINCT inp.名称 || with_prefix(inp.棟名, '-') || with_prefix(inp.時代, '-'), '|')
      AS 表示名
  FROM
    'download.csv' inp
  WHERE
    所在地 IS NOT NULL OR 所在地 <> ''
  GROUP BY
    所在地
)
select m.*
from main m
INNER JOIN style_key_count on m.種別1 = style_key_count.種別1
ORDER BY
  -- スタイルのキーを指定する。
  --   マイマップではレイヤーごとに最大20のスタイルしか指定できないため、
  --   件数が少ないキーは「その他」に押しやられてしまう。
  style_key_count.cnt desc
;

COPY (SELECT * FROM out where 経度 is not null) TO 'out.csv';
COPY (SELECT * exclude (経度, 緯度) FROM out where 経度 is null) TO 'out.経度緯度なし.csv';
