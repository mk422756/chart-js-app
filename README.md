# coding-test

アプリケーションを課題内容に沿って機能追加または修正をお願いいたします。

## アプリケーションについて

以下の画像のように、シリアルのデータの可視化をするアプリケーションです。
ユーザがデータの特徴を知るために利用されます。

![image](https://user-images.githubusercontent.com/37053383/211444776-b74c6554-5249-42f9-8a32-1abd64f1e3c1.png)

### シリアルのデータ

このデータセットはKaggleからダウンロードしました。
該当のページにデータの詳細が載っていますのでご参照ください。
<https://www.kaggle.com/datasets/crawford/80-cereals>
License: CC BY-SA 3.0

## 課題について

次の1~4の課題のうち１つを選んで実装をお願いいたします。（複数でもOKです）

実装する時には各自用意したGithubのリポジトリでコミット履歴を残してください。
詳細は提出方法の項にあります。

尚、仕様があるものは後述しています。

1. 任意の軸で比較できる機能を追加する
2. 表示するデータを絞り込む機能を追加する
3. シリアルのデータをデータベースから返すようにする
4. シリアルのデータを編集するエンドポイントを設計する（追加する）

以下のポイントも加点します。

5. VercelやAWS AppRunnerなどでアプリケーションをホスティングする
6. ESlint、Prettierを追加・設定する
7. ユニットテストを加える
8. コードをリファクタリングする

### 1. 任意の軸で比較できる機能を追加する

x軸がCalories、y軸がCarboで固定されていますが、各軸をユーザーがセレクトボックスから任意に変更できるようにしたいです。
表示しているデータは `/src/constans/cereals.ts` にあり、次のプロパティを軸として選択できるようにしてください。

- caloreis
- protein
- fat
- sodium
- fiber
- carbo
- sugars
- potass
- vitamins
- shelf
- weight
- cups
- rating

### 2. 表示するデータを絞り込む機能を追加する

グラフに表示するデータを絞り込む機能を追加してください。
`mfr`または`type`

### 3. シリアルのデータをデータベースから返すようにする

### 4. シリアルのデータを編集するエンドポイントを設計する（追加する）

- シリアルのデータを読み書きする要件があると仮定し、追加するエンドポイントの設計をOpenAPI（Swagger）で定義する
- 現在は `/api/cereals` のエンドポイントから `/src/constans/cereals.ts` のファイルのデータが返ってくるが、PrismaまたはTypeORMを利用してDBコンテナ内にあるデータを読み取って返すように切り替える

### 制約と注意事項

- Nextjs + TypeScriptを利用して実装すること
- Google Chrome最新版で正しく動くこと
- ソースコードはGitで管理し、作成したソースコードはGitHubにアップロードすること
- リファクタリングを推奨しています
- 以下もレビュー対象です
  - [リーダブルコード](https://www.oreilly.co.jp/books/9784873115658/)に書いてあるような実装のポイント
  - アプリのコンポーネント粒度の設計
  - Gitコミットメッセージやコミット粒度
  - ドキュメンテーション等

### 課題の提出方法

- 課題を実装したGitHubの公開リポジトリのURLをお知らせ下さい。
- 早く完成した場合は、その時点でご提出くださいますようお願い致します。

## アプリケーションの開発環境

開発にはNodejsの環境が必要です。準備をお願いいたします。

- Nodejs LTS
- Docker環境 (Option)

### 実行方法

1. `npm ci` を実行
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### Dockerを用いる場合 (Option)

- Docker環境 (Windows)

VSCode の拡張機能「Dev Containers」を事前にインストールしておき、
VSCode の Dev Containers から起動する。
※もし初回でエラーが出たら一度 `docker compose up -d` を実行してみてください。

1. VSCode の画面左下「><」みたいなボタンから「Reopen in Container」を選択
1. `npm i` を実行
1. `npm run dev` を実行
1. <http://localhost:3000/> を開く

### 一部の任意実装項目用のMakeコマンド

一部の課題項目でデータベースを利用します。
DBコンテナとマイグレーションのスクリプトを用意していますのでご活用ください。

#### 方法

1. `docker-compose up -d`でコンテナを立ち上げる。
2. `make db-init`を実行するとシリアルのデータがデータベースに格納されます。

Windowsの場合は以下の方法でMakeコマンドを準備できます。

<details>
<summary>WindowsでMakeコマンドを準備する方法 <br> (クリックで開く)</summary>

Windows11で動作確認してます。

1. [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)からMakeのインストールファイルをダウンロードする。
![image](https://user-images.githubusercontent.com/37053383/211447419-739f556a-fd79-4a6e-888f-a11ead2f79a0.png)
2. ダウンロードしたファイルをインストールする
3. 環境変数にmake.exeのファイルパスを追加する。
   例：`C:\Program Files (x86)\GnuWin32\bin`

Makeインストールの方法は[こちら](https://camedphone.com/archives/1192)の記事が詳細で参考となります。

```sh
# PowerShellでの実行結果
PS C:\...\frontend-coding-test> make db-init
docker compose exec db psql -U postgres -d coding_test -f /workspace/db/init.sqlCREATE TABLE
docker compose exec db psql -U postgres -d coding_test -c "\COPY cereals FROM '/workspace/db/cereals.csv' DELIMITER ',' CSV HEADER;"
COPY 77
docker compose exec db psql -U postgres -d coding_test -c "ALTER TABLE cereals ADD id serial PRIMARY KEY;"ALTER TABLE
```

</details>
