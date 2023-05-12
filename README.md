# TaipeiTrip
1. Summary 專案簡介
2. Demo 專案展示
3. Architecture Diagram 專案架構
4. Feature 專案介紹
    * Lazy Loading & Infinite Scroll
    * Member Systems
    * Keyword Search
    * Attraction Order
    * Upload Membericon & Check Order
## Summary
![summary image](/static/img/summary.png)
Taipei-Trip is a travel e-commerce website where users can search for different attractions using keywords. By clicking on the photos of the attractions, users can view more information about them. After logging in, users can reserve and pay for trips, view their order history in the member center, and change their profile picture.
台北一日遊是一個旅遊電商網站，搜尋關鍵字可找到不同景點，點擊景點照片可以查看更多景點資訊，登入會員後可以預約行程、付款，點擊會員中心查看歷史訂單，並且可以更換會員頭貼。
## Demo
### Link

### Credit Card for test
|      -     |        -      |
|------------|---------------|
|Card Number |424242442424242|
|Valid Date  |01/24          |
|CVV         |123            |
## Architecture Diagram
![structure image](/static/img/Structure.png)
## Feature
* ### Lazy Loading & Infinite Scroll
使用 IntersectionObserver 技術來實現 Infinite Scroll 和lazy loading的效果。當使用者滾動到頁面底部，自動載入更多的景點數據，提升用戶體驗和互動性。
![lazy loading](/static/img/loading.gif)
* ### Member Systems
提供會員註冊功能，登入會員後可預約行程及付款．
![Member](/static/img/logging.gif)
* ### Keyword Search
點選景點分類、輸入關鍵字尋找可預約的景點。
![Keyword](/static/img/keyword.gif)
* ### Attraction Order
點選景點圖片查看景點的詳細介紹。預約行程只需要點選 "預約行程"，然後輸入訂購人資料和付款資料即可成功訂購。網站使用了第三方支付平台 TapPay，透過 TapPay，可以輕鬆地完成預約並付款。
![Attraction Order](/static/img/order.gif)
* ### Upload Membericon & Check Order
點選會員中心，可上傳圖片更改會員icon、查看歷史訂單，點選詳細資料可查看每筆訂單的詳細內容。
![Check Order image](/static/img/checkorder2.png)