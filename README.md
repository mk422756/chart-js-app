# 課題提出内容

- 以下の課題の実装を行いました。
  - 任意の軸で比較できる機能を追加する
    - UI のセレクトボックスから任意の軸を選択できるように実装しました。
  - 表示するデータを絞り込む機能を追加する
    - UI のセレクトボックスから Type と Mfr の選択して絞り込めるように実装しました。
  - シリアルのデータをデータベースから返すようにする
    - Prisma を使用して DB のデータを取得するように実装しました。
  - シリアルのデータを編集するエンドポイントを設計する（追加する）
    - OpenAPI のドキュメント(/src/doc/openapi.yaml)を作成し、各 API を実装しました。
- その他追加で実装したこと
  - Vercel や AWS AppRunner などでアプリケーションをホスティングする
    - Vercel でホスティングしています。以下の URL で確認できます。
    - https://chart-js-app.vercel.app
  - ESlint、Prettier を追加・設定する
    - ESlint、Prettier を追加・設定しました。設定は/.eslintrc にあります。
  - ユニットテストを加える
    - サーバーの Usecase レイヤーのテストを追加しました。
  - コードをリファクタリングする
    - 以下の点をリファクタリングしました。
      - UI のコンポーネントを分割した
        - セレクトボックスとチャート部分をコンポーネント化しました
      - サーバー側実装を DDD ライク([参考](https://little-hands.hatenablog.com/entry/2022/01/24/domain-object-design))な実装に変更しました
        - プレゼンテーション層(next.js の API 実装),ユースケース層、ドメイン層、リポジトリ層に分割して実装しました。
          - DB やファイルからのデータ取得はリポジトリ経由で行うようにしました
          - モック用の InMemory リポジトリを作成してユニットテストに使用しました
      - リクエストとドメインモデルのバリデーションの追加
        - [zod](https://zod.dev/)を使用してバリデーションを行うようにしました

# chart-js-app

アプリケーションを課題内容に沿って機能追加または修正をお願いいたします。

## アプリケーションについて

以下の画像のように、シリアルのデータの可視化をするアプリケーションです。
ユーザがデータの特徴を知るために利用されます。

![image](https://user-images.githubusercontent.com/37053383/211444776-b74c6554-5249-42f9-8a32-1abd64f1e3c1.png)

### シリアルのデータ

このデータセットは Kaggle からダウンロードしました。
該当のページにデータの詳細が載っていますのでご参照ください。
<https://www.kaggle.com/datasets/crawford/80-cereals>
License: CC BY-SA 3.0

## 課題について

次の 1~4 の課題のうち１つを選んで実装をお願いいたします。（複数でも OK です）

実装する時には各自用意した Github のリポジトリでコミット履歴を残してください。
詳細は提出方法の項にあります。

尚、仕様があるものは後述しています。

1. 任意の軸で比較できる機能を追加する
2. 表示するデータを絞り込む機能を追加する
3. シリアルのデータをデータベースから返すようにする
4. シリアルのデータを編集するエンドポイントを設計する（追加する）

以下のポイントも加点します。

5. Vercel や AWS AppRunner などでアプリケーションをホスティングする
6. ESlint、Prettier を追加・設定する
7. ユニットテストを加える
8. コードをリファクタリングする

### 1. 任意の軸で比較できる機能を追加する

x 軸が Calories、y 軸が Carbo で固定されていますが、各軸をユーザーがセレクトボックスから任意に変更できるようにしたいです。
表示しているデータは `/src/constants/cereals.ts` にあり、次のプロパティを軸として選択できるようにしてください。

- calories
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
二つのカラム`mfr` と `type` の値を選択したとき、AND 検索で該当するシリアルのデータのみを表示します。

例）mfr[K] AND type[C] と選択すると、mfr が K でかつ type が C のデータのみが表示される。

### 3. シリアルのデータをデータベースから返すようにする

現在は `/api/cereals` のエンドポイントから `/src/constants/cereals.ts` のファイルのデータが返ってきますが、Prisma または TypeORM を利用して DB コンテナ内にあるデータを読み取って返すように切り替えてください。
DB コンテナへのデータ投入については、この README.md 下部にある「一部の任意実装項目用の Make コマンド」をご確認ください。

### 4. シリアルのデータを編集するエンドポイントを設計する（追加する）

シリアルのデータを読み書きする要件があると仮定し、追加するエンドポイントの設計を OpenAPI（Swagger）で定義してください。
また、定義したエンドポイントにもとづいて API を実装してください。
実装についてはバックエンドの処理のみとし、フロントエンドで値を submit するような処理は実装不要です。

### 制約と注意事項

- Next.js + TypeScript を利用して実装すること
- Google Chrome 最新版で正しく動くこと
- ソースコードは Git で管理し、作成したソースコードは GitHub にアップロードすること
- リファクタリングを推奨しています
- 以下もレビュー対象です
  - [リーダブルコード](https://www.oreilly.co.jp/books/9784873115658/)に書いてあるような実装のポイント
  - アプリのコンポーネント粒度の設計
  - Git コミットメッセージやコミット粒度
  - ドキュメンテーション等

### 課題の提出方法

- 課題を実装した GitHub の公開リポジトリの URL をお知らせ下さい。
- 早く完成した場合は、その時点でご提出くださいますようお願い致します。

## アプリケーションの開発環境

### 実行方法

Node.js のバージョンは 16.13.2 で動作確認しています。ローカルで開発される場合はこちらに相当する Node 環境の準備をお願いいたします。

1. `npm ci` を実行
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### Docker を用いる場合 (Option)

- Docker 環境 (Windows)

VSCode を使われている場合は、拡張機能の「Dev Containers」を使うのが便利です。
※もし初回でエラーが出たら一度 `docker compose up -d` を実行してみてください。

1. Docker 環境の起動 <br>
   1-a. 通常起動する場合： `docker compose up -d` <br>
   1-b. Dev Containers を使う場合： VSCode の画面左下「><」みたいなボタンから「Reopen in Container」を選択 <br>
1. `npm ci` を実行
1. `npm run dev` を実行
1. <http://localhost:3000/> を開く

### 一部の任意実装項目用の Make コマンド

一部の課題項目でデータベースを利用します。
DB コンテナとマイグレーションのスクリプトを用意していますのでご活用ください。

#### 方法

1. `docker-compose up -d`でコンテナを立ち上げる。
2. `make db-init`を実行するとシリアルのデータがデータベースに格納されます。

Windows の場合は以下の方法で Make コマンドを準備できます。

<details>
<summary>WindowsでMakeコマンドを準備する方法 <br> (クリックで開く)</summary>

Windows11 で動作確認してます。

1. [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)から Make のインストールファイルをダウンロードする。
   ![image](https://user-images.githubusercontent.com/37053383/211447419-739f556a-fd79-4a6e-888f-a11ead2f79a0.png)
2. ダウンロードしたファイルをインストールする
3. 環境変数に make.exe のファイルパスを追加する。
   例：`C:\Program Files (x86)\GnuWin32\bin`

Make インストールの方法は[こちら](https://camedphone.com/archives/1192)の記事が詳細で参考となります。

```sh
# PowerShellでの実行結果
PS C:\...\chart-js-app> make db-init
docker compose exec db psql -U postgres -d chart_js_app -f /workspace/db/init.sqlCREATE TABLE
docker compose exec db psql -U postgres -d chart_js_app -c "\COPY cereals FROM '/workspace/db/cereals.csv' DELIMITER ',' CSV HEADER;"
COPY 77
docker compose exec db psql -U postgres -d chart_js_app -c "ALTER TABLE cereals ADD id serial PRIMARY KEY;"ALTER TABLE
```

</details>
