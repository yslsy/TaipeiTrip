# TaipeiTrip
1. [Summary 專案簡介](https://github.com/yslsy/TaipeiTrip/tree/develop#summary)
2. [Demo 專案展示](https://github.com/yslsy/TaipeiTrip/tree/develop#demo)
3. [Architecture Diagram 專案架構](https://github.com/yslsy/TaipeiTrip/tree/develop#architecture-diagram)
4. [Feature 專案介紹](https://github.com/yslsy/TaipeiTrip/tree/develop#feature)
    * [Lazy Loading & Infinite Scroll](https://github.com/yslsy/TaipeiTrip/tree/develop#lazy-loading--infinite-scroll)
    * [Member Systems](https://github.com/yslsy/TaipeiTrip/tree/develop#member-systems)
    * [Keyword Search](https://github.com/yslsy/TaipeiTrip/tree/develop#keyword-search)
    * [Attraction Order](https://github.com/yslsy/TaipeiTrip/tree/develop#attraction-order)
    * [Upload MemberIcon & Check Order](https://github.com/yslsy/TaipeiTrip/tree/develop#upload-membericon--check-order)
## Summary
![summary image](/static/img/summary.png)
Taipei-Trip is a travel e-commerce website where users can search for different attractions using keywords. By clicking on the photos of the attractions, users can view more information about them. After logging in, users can reserve and pay for trips, view their order history in the member center, and change their profile picture.<br>
台北一日遊是一個旅遊電商網站，搜尋關鍵字可找到不同景點，點擊景點照片可以查看更多景點資訊，登入會員後可以預約行程、付款，點擊會員中心查看歷史訂單，並且可以更換會員頭貼。
## Demo
### Link
http://54.219.37.158:3000
### Credit Card for test
|      -     |        -       |
|------------|----------------|
|Card Number |4242424242424242|
|Valid Date  |01/24           |
|CVV         |123             |
## Architecture Diagram
![structure image](/static/img/Structure.png)
## Feature
* ### Lazy Loading & Infinite Scroll
Use  `IntersectionObserver`  to display Infinite Scroll and lazy loading effects. When the user scrolls to the bottom of the page, more attractions are automatically loaded, improving user experience and interactivity.<br>
使用 `IntersectionObserver` 技術來實現 Infinite Scroll 和lazy loading的效果。當使用者滾動到頁面底部，自動載入更多的景點數據，提升用戶體驗和互動性。

![lazy loading](/static/img/loading.gif)
* ### Member Systems
Provide member registration function. After logging in as a member, you can make a reservation and payment for the trip.<br>
提供會員註冊功能，登入會員後可預約行程及付款。

![Member](/static/img/logging.gif)
* ### Keyword Search
Click on attraction categories or enter keywords to find attractions.<br>
點選景點分類、輸入關鍵字尋找可預約的景點。

![Keyword](/static/img/keyword.gif)
* ### Attraction Order
Click on the attraction image to view the detailed introduction. To make a reservation, simply click on "Start Booking", then enter the order and payment information. The website uses a third-party payment platform, `TapPay`, to easily complete the reservation and payment process.<br>
點選景點圖片查看景點的詳細介紹。預約行程只需要點選 "開始預約行程"，然後輸入訂購人資料和付款資料即可成功訂購。網站使用了第三方支付平台 `TapPay`，透過 `TapPay`，可以輕鬆地完成預約並付款。

![Attraction Order](/static/img/order.gif)
* ### Upload MemberIcon & Check Order
Click on "Member Center" to upload images by using `S3` service and change your member icon. You can also view your order history and order details in Member Center.<br>
點選會員中心，透過 `S3` 服務上傳圖片，可更改會員頭像，同時還能查看歷史訂單及其詳細內容。

![Check Order image](/static/img/checkorder2.png)