1. https://kunishitei.bunka.go.jp/ で検索
1. CSV出力。"download.csv"という名前で保存される
1. `duckdb < group.sql` out.csvが出力される
1. レコード数が2000を超える場合は分割をする必要がある。 `go run csv-split.go --lines 2000 < out.csv && rm out.csv`
1. https://www.google.com/maps/d/u/0/ で出力されたCSVをちまちま登録する。ちまちまスタイル設定する

できあがったマイマップのURL: https://www.google.com/maps/d/u/0/edit?mid=15gRJCXqP7OBzB_Imdp5oGArdCq5G11A&usp=sharing
