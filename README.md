# AC_restaurant-list-A6

<br>

此專案提供使用者瀏覽、搜尋特定的餐廳，並可以點擊餐廳瀏覽更詳細的資訊，如:餐廳類別、地址、評分、描述等。另外可額外新增、刪除和修改餐廳資料。
需註冊會員才可使用。

## 產品功能

<br>

* 使用者可以註冊帳號，或者可以透過 Facebook Login 直接登入
* 使用者可以瀏覽全部的餐廳
* 使用者可以瀏覽餐廳的詳細資訊
* 使用者可以修改餐廳的資訊
* 使用者可以新增 / 刪除餐廳
* 使用者可以選擇餐廳的排序方式

<br>

## 建置環境

<br>

* Visual Studio Code
* node.js : 10.15.0
* express: 4.17.1
* express-handlebars: 5.3.2
* mongoose: ^5.12.0
* mongoDB: ^4.2.14

<br>

## 安裝流程

<br>

1. 開啟終端機(terminal)，利用 git clone 將專案下載至本機
```
git clone https://github.com/Linus-Peng1/AC_restaurant-list-A6.git
```
2. 進入存放此專案資料夾
```
cd restaurant-list
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
6. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

App is running on http://localhost:3000

<br>

## 測試會員資料

<br>

* email: user1@example.com
* password: 12345678

* email: user2@example.com
* password: 12345678

