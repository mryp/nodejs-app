FORMAT: 1A

# nodejs-app API

# Group アクセスAPI

## バージョン情報取得 [/v1/version]
### GET

* 現在のバージョン情報を取得する

+ Response 200 (application/json)
    + version: 1.0.0 (number, required) - アプリバージョン番号
    + name: nodejs-app (string, required) - アプリ名

## ユーザー追加 [/v1/user]
### POST

* ユーザーを追加する

+ Request (application/json)
    + name: t-yamada (string, required) - ユーザー名（英数字）
    + dispname: 山田太郎 (string, required) - 表示名

+ Response 200 (application/json)
    + status: 0 (number, required) - 登録結果（正常時=0, エラー時=それ以外）

## ユーザー取得 [/v1/user{?name}]
### GET

* ユーザー名からユーザー情報を取得する

+ Parameters 
    + name: t-yamada (string, required) - ユーザー名（英数字）

+ Response 200 (application/json)
    + name: t-yamada (string, required) - ユーザー名（英数字）
    + dispname: 山田太郎 (string, required) - 表示名
