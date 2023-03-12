let cardContainer = document.querySelector(".product_container");
let firstPage = document.querySelector("#first_page");
let secondPage = document.querySelector("#second_page");
let addBtn = document.querySelector("#add_product");


let objSchema = {
    productId : "",
    productName : "",
    productImage : "",
    productPrice : "",
    productDescription : ""
}

let tempObj = {
    productId : "1",
    productName : "Think and grow rich",
    productImage : "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61y04z8SKEL._SX349_BO1,204,203,200_.jpg",
    productPrice : "670₹",
    productDescription : "asfasfasfasfas"
}

let string = ` <div class="product_card">
<h3 class="product_id">${tempObj.productId}</h3>
<h1 class="product_name">${tempObj.productName}</h1>
<img src="${tempObj.productImage}" alt="image" class="product_image">
<p class="product_price">${tempObj.productPrice}</p>
<p class="product_description">${tempObj.productDescription}</p>
<div class="hidden_btn">
    <button class="edit_btn">Edit</button>
    <button class="delete_btn">Delete</button>
</div>
</div>`

cardContainer.innerHTML = string; 

let hiddenBtn = document.querySelector(".hidden_btn");
let editBtn = document.querySelector(".edit_btn");
function defaultPage(){
    firstPage.style.display = "block";
    secondPage.style.display = "none";
    addBtn.style.display = "none";
    hiddenBtn.style.display = "none";
}
function editOption(){
    firstPage.style.display = "block";
    secondPage.style.display = "none";
    addBtn.style.display = "flex";
    hiddenBtn.style.display = "flex";
}

editBtn.addEventListener("click",(event)=>{
    let id = event.target.parentNode.parentNode.childNodes[1].innerHTML;
    console.log(id);
})