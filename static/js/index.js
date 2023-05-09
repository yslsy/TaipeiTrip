let keyword;
let nextPage;
let isLoading = false;

// 回首頁
function toindex(){
    window.location.href="/";
}

// 載入景點搜尋框
function searchcategory(){
    // isLoading = true;
    fetch("/api/categories")
    .then((response) =>{
        return response.json();
    })
    .then((result) =>{
        for (let i=0;i<result.data.length;i++){
            let searchCat = document.querySelector(".search_category")

            let categoryItem = document.createElement("div");
            categoryItem.classList.add("categoryItem");

            let categoryItemtext = document.createElement("text");
            categoryItemtext.classList.add("categoryItemtext");
            let categoryItemtext_ = document.createTextNode(result.data[i]);
            categoryItemtext.id = "categoryItem"+i;

            categoryItemtext.appendChild(categoryItemtext_);
            categoryItem.appendChild(categoryItemtext);
            searchCat.appendChild(categoryItem);
        }
        isLoading = false;
    })
}
searchcategory();

loadFetch("/api/attractions?page=0")
function loadFetch(url){
    // isLoading = true;
    fetch(url).then((response) =>{
        return response.json();
    }).then((result) =>{
        fetchattraction(result);
    })
}

// 關鍵字搜尋
let searchBtn = document.querySelector(".search_button")
searchBtn.addEventListener("click" ,() =>{
    keyword = document.querySelector(".search_input").value;
    let url=`/api/attractions?page=0&keyword=${keyword}`;
    document.querySelector("main").innerHTML="";
    keywordFetch(url);
  })
function keywordFetch(url){
    isLoading = true;
    fetch(url).then((response) =>{
        return response.json();
    }).then((result) =>{
        console.log(result.data.length);
        if(result.data.length == 0){
            document.querySelector("main").innerHTML="沒有搜尋到結果";
          }
        fetchattraction(result);
    })
}

function fetchattraction(result){
    for (let i=0; i<result.data.length; i++){
                const main = document.querySelector("main");
                main.classList.add("main");
                const allAttr = document.createElement("div");
                allAttr.classList.add("allAttr");
                allAttr.onclick=()=>{
                    window.location.href="/attraction/"+result["data"][i]["id"];
                }
        
                const imgName = document.createElement("div");
                imgName.classList.add("imgName");
                allAttr.appendChild(imgName);
            
                const attrImg = document.createElement('img');
                attrImg.src = result.data[i].images[0];
                attrImg.classList.add("img");
                imgName.appendChild(attrImg);
            
                const namebg = document.createElement('div');
                namebg.classList.add("namebg");
                const attrName = document.createElement('div');
                attrName.classList.add("attrName");
                attrName.textContent = result.data[i].name;
                namebg.appendChild(attrName);
                imgName.appendChild(namebg);
                  
                const attrTagbg = document.createElement('div');
                attrTagbg.classList.add("attrTagbg");
            
                const attrMrt = document.createElement('div');
                attrMrt.classList.add("mrt");
                attrMrt.textContent = result.data[i].mrt;
                attrTagbg.appendChild(attrMrt);
            
                const attrCat = document.createElement('div');
                attrCat.classList.add("category");
                attrCat.textContent = result.data[i].category;
                attrTagbg.appendChild(attrCat);
            
                allAttr.appendChild(attrTagbg);
                main.appendChild(allAttr);
                
            }
    nextPage = result.nextpage;
    isLoading = false;
}

const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.7,
}
const observer = new IntersectionObserver((entries)=>{
    if (entries[0].isIntersecting){
        loadAll();
        console.log(isLoading)
    }
}, options);
const footer = document.querySelector("#footer");
observer.observe(footer);

function loadAll(){
    if (keyword && isLoading == false){
        let url=`/api/attractions?page=${nextPage}&keyword=${keyword}`;
        keywordFetch(url);
    }else if(nextPage != null && isLoading==false){
        let url=`/api/attractions?page=${nextPage}`;
        loadFetch(url);
    }
  }

function blockon() {
    let outblock = document.querySelector(".blockoff");
    outblock.style.display = "flex";

    let categoryblock = document.querySelector(".search_category");
    categoryblock.style.display = "grid";

    for(let i=0; i<9;i++){
        const categoryWord = document.querySelector("#categoryItem"+i);
        categoryWord.addEventListener("click", function (e) {
            let inputword = document.querySelector("#search_input").value;
            inputword.innerHTML = "";
            inputword = e.target.textContent;

            let inputWord = document.querySelector("#search_input");
            inputWord.setAttribute("value", inputword);

            categoryblock.style.display = "none";
        });
    };
}

function blockoff() {
    let categoryblock = document.querySelector(".search_category");
    categoryblock.style.display = "none";

    const outblock = document.querySelector(".blockoff");
    outblock.style.display = "none";
}

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

// 取得資料庫中的頭貼網址
window.addEventListener("load", ()=>{
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
            imageUrl = "https://"+result['bucketname']+".s3.us-west-1.amazonaws.com/"+result['filename']+"user.png"
        }else{
            imageUrl= "https://"+result['bucketname']+".s3.us-west-1.amazonaws.com/"+result['filename']+result['key'];
        }
        getIcon(imageUrl);
    })
})
