const orderDiv = document.getElementById("orderdiv");
const orderDetailbox = document.querySelector(".orderdetailbox");
const ordermodal = document.querySelector(".ordermodal");

// 載入頁面
window.addEventListener("load", ()=>{
    fetch("/api/user/auth",{
        method: "GET",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        document.querySelector(".booking").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("member").style.display = "block";
    })

    // 取得資料庫中的頭貼網址
    fetch("/api/memberdata", {
        method:"GET",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        function getIcon(imageUrl){
            const memberImage = document.getElementById("memberpic");
            memberImage.style.backgroundImage = `url('${imageUrl}')`;
            const memberIcon = document.querySelector(".membericon");
            memberIcon.style.backgroundImage = `url('${imageUrl}')`;
        }
        let imageUrl;
        if(result['key'] === 'default_icon'){
            imageUrl = "https://"+result['bucketname']+".s3.us-west-1.amazonaws.com/"+result['filename']+"user.png"
        }else{
            imageUrl= "https://"+result['bucketname']+".s3.us-west-1.amazonaws.com/"+result['filename']+result['key'];
        }
        getIcon(imageUrl);
    })

    // 訂單欄位
    const titles = ["訂單編號", "景點名稱", "行程日期", "詳細資訊"];
    const titlesBox = document.createElement("div");
    titlesBox.classList.add("titlesBox");
    titles.forEach(title => {
        const titleElement = document.createElement("div");
        titleElement.textContent = title;
        titleElement.classList.add("titlesElement");
        titlesBox.appendChild(titleElement);
    });
    orderDiv.appendChild(titlesBox);
    const noOrderBox = document.createElement("div");
    noOrderBox.classList.add("noOrderBox");
    noOrderBox.textContent = "尚無任何訂單";
    orderDiv.appendChild(noOrderBox);
    


    // 取得歷史訂單
    fetch("/api/payedorder", {
        method:"GET"
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        if(result['data'] === null){
            noOrderBox.style.display = "block"
        }else{
            noOrderBox.style.display = "none"
            for (let i=0; i<result.data.length; i++){
                const orderBox = document.createElement("div");
                orderBox.classList.add("orderbox");

                const orderItems = [
                    {text: result.data[i][1]},
                    {text: result.data[i][4]},
                    {text: result.data[i][7]},
                    {text: "訂單詳細", orderID: result.data[i][1]}
                ];
            
                orderItems.forEach(orderitem => {
                const orderElement = document.createElement("div");
                orderElement.textContent = orderitem.text;
                orderElement.classList.add("orderElement");
                if (orderitem.orderID) {
                    orderElement.setAttribute("order-id", orderitem.orderID);
                    orderElement.addEventListener("click", handleOrderDetailClick);
                }
                orderBox.appendChild(orderElement);
                });

                orderDiv.appendChild(orderBox);
            }
        }
        
    })
})

// 點選預定行程
document.querySelector(".booking").addEventListener("click", ()=>{
    fetch("/api/user/auth", {
        method:"GET",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        if (result["data"]!=null){
            window.location.href="/booking"
        }else{
            loginModal.style.display = "block"
        }
    })
})

// 點選會員中心
document.querySelector(".member").addEventListener("click", ()=>{
    window.location.href="/memberdata"
})

// 點選登出
document.getElementById("logout").addEventListener("click", ()=>{
    fetch("/api/user/auth", {
        method: "DELETE",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        if (result["ok"]){
            window.location.href="/"
        }
    })
})

// 點選上傳
document.getElementById("picinput").addEventListener("submit", (event)=>{
    event.preventDefault(); // 防止表單預設行為
    const file = event.target.querySelector('input[type="file"]').files[0];
    const formData = new FormData();
    formData.append("file", file);
    if(!file){
        alert("請選擇檔案再上傳")
    }else{
        fetch("/api/memberdata", {
            method: "PATCH",
            body: formData
        }).then((response)=>{
            return response.json()
        }).then((result)=>{
            if (result){
                const imageUrl = "https://"+result['bucketname']+".s3.us-west-1.amazonaws.com/"+result['filename'] + result['key'];
                const memberImage = document.getElementById("memberpic");
		        memberImage.style.backgroundImage = `url('${imageUrl}')`;
            }
        })
        const filevalue = document.getElementById('file');
        filevalue.value='';
    }
})

// 點選訂單詳細
function handleOrderDetailClick(event) {
    const targetElement = event.target;  
    if (targetElement.hasAttribute("order-id")) {
        const orderId = targetElement.getAttribute("order-id");
  
        fetch("/api/orderdetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"order_Id": orderId})
        }).then((response)=>{
            return response.json()
        }).then((result)=>{
            const orderDetailbox = document.querySelector(".orderdetailbox");
            const ordermodal = document.querySelector(".ordermodal");
            orderDetailbox.style.display = "block";
            ordermodal.style.display = "block";

            const time = result["data"][8] === "morning" ? "上午九點" : "下午一點";
            const orderInfo = [
                {text: "訂單編號："+result["data"][1]},
                {text: "訂單金額："+result["data"][2]},
                {text: "預定景點名稱："+result["data"][4]},
                {text: "行程日期："+result["data"][7]},
                {text: "時間："+time},
                {text: "——————————————"},
                {text: "訂購姓名："+decodeURIComponent(result["data"][9])},
                {text: "訂購信箱："+result["data"][10]},
                {text: "訂購電話："+result["data"][11]}
            ]
            orderInfo.forEach(orderInfos =>{
                const orderInfobox  = document.createElement("div");
                orderInfobox.textContent = orderInfos.text;
                orderInfobox.classList.add("orderInfobox");
                orderDetailbox.appendChild(orderInfobox);
            })
        })
    }
}

function OrderDetailCloseClick(event){
    orderDetailbox.style.display = "none";
    ordermodal.style.display = "none";
    const orderInfoboxes = document.querySelectorAll(".orderInfobox");
    orderInfoboxes.forEach((orderInfobox) => {
        orderInfobox.remove();
    });
}

// 關閉訂單詳細
document.querySelector(".close").addEventListener("click", OrderDetailCloseClick);
// 點選背景隱藏 orderdetailbox
window.onclick = function(event) {
    if (event.target === ordermodal) {
        OrderDetailCloseClick();
    }
}
