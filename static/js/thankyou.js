const searchParams = new URLSearchParams(window.location.search);
let thankyouOrderumber = searchParams.get("number");

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

    // 訂單編號資料
    fetch("/api/order/"+thankyouOrderumber , {
        method: "GET",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        console.log(result);
        console.log(document.querySelectorAll(".thankyoucontact"));
        document.querySelector(".thankyounumber").textContent = result["data"]["number"];
        // 訂購人資料
        document.querySelectorAll(".thankyoucontact")[0].textContent = decodeURI(result["data"]["contact"]["name"]);
        document.querySelectorAll(".thankyoucontact")[1].textContent = result["data"]["contact"]["phone"];
        document.querySelectorAll(".thankyoucontact")[2].textContent = result["data"]["contact"]["email"];
        // 訂單內容
        document.querySelectorAll(".thankyoucontact")[3].textContent = result["data"]["trip"]["date"];
        document.querySelectorAll(".thankyoucontact")[4].textContent = result["data"]["trip"]["attraction"]["name"];
        document.querySelectorAll(".thankyoucontact")[5].textContent = result["data"]["trip"]["attraction"]["address"];
        document.querySelectorAll(".thankyoucontact")[6].textContent = result["data"]["price"];
    })

    // 取得資料庫中的頭貼網址
    fetch("/api/memberdata", {
        method:"GET",
    }).then((response)=>{
        return response.json()
    }).then((result)=>{
        function getIcon(imageUrl){
            const memberIcon = document.querySelector(".membericon");
            memberIcon.style.backgroundImage = `url('${imageUrl}')`;
        }
        let imageUrl;
        if(result['key'] === 'default_icon'){
            imageUrl = "https://fourysl.s3.us-west-1.amazonaws.com/tourmember/user.png"
        }else{
            imageUrl= "https://fourysl.s3.us-west-1.amazonaws.com/tourmember/" + result['key'];
        }
        getIcon(imageUrl);
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