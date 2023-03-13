let cardContainer = document.querySelector(".product_container");
let firstPage = document.querySelector("#first_page");
let secondPage = document.querySelector("#second_page");
let addBtn = document.querySelector("#add_product");
let inputFieldData = document.querySelectorAll(".productInput");
let editflag = false;
let addflag = false;
let deleteflag = false;
let sortType = "";
let sortAlgo = true; // ascending order
let editIndex;
if(localStorage.crntId == undefined) localStorage.setItem("crntId","0");
if(localStorage.productData == undefined) localStorage.setItem("productData",JSON.stringify([]));


window.onload = showData();

function sortArray(arr){
    if(sortType == "byName"){
        if(sortAlgo){
            arr =  arr.sort((ele1, ele2) => {
                let fa = ele1.productName.toLowerCase(),
                    fb = ele2.productName.toLowerCase();
                if(fa > fb) return 1;
                if(fa < fb) return -1;
                return 0;
            });
        }else{
            arr =  arr.sort((ele1, ele2) => {
                let fa = ele1.productName.toLowerCase(),
                    fb = ele2.productName.toLowerCase();
                if(fa < fb) return 1;
                if(fa > fb) return -1;
                return 0;
            });
        }
    }
    else if(sortType == "byPrice"){
        if(sortAlgo){
            arr.sort((ele1, ele2)=>{
                return Number(ele1.productPrice.substring(0,ele1.productPrice.length - 1)) - Number(ele2.productPrice.substring(0,ele2.productPrice.length - 1))
            })
        }else{
            arr.sort((ele1, ele2)=>{
                return Number(ele2.productPrice.substring(0,ele2.productPrice.length - 1)) - Number(ele1.productPrice.substring(0,ele1.productPrice.length - 1))
            })
        }
    }else if(sortType == "byId"){
        if(sortAlgo){
            arr.sort((ele1, ele2)=>{
                return Number(ele1.productId) - Number(ele2.productId);
            })
        }else{
            arr.sort((ele1, ele2)=>{
                return Number(ele2.productId) - Number(ele1.productId);
            })
        }
    }
}

function showData(){
    let String = "";
    let tempArr = JSON.parse(localStorage.productData);
    sortArray(tempArr);
    tempArr.forEach((product)=>{
        let tempString = ` <div class="product_card">
            <h3 class="product_id">${product.productId}</h3>
            <h1 class="product_name">${product.productName}</h1>
            <img src="${product.imageLink}" alt="image" class="product_image">
            <p class="product_price">${product.productPrice}</p>
            <p class="product_description">${product.productDesc}</p>
            <div class="hidden_btn">
                <button class="edit_btn">Edit</button>
                <button class="delete_btn">Delete</button>
            </div>
            </div>`
        String += tempString
    })
    cardContainer.innerHTML = String; 
}
// ----------- sortData -------
document.querySelectorAll(".sortType").forEach((element)=>{
    element.addEventListener('click',(event)=>{
        function defaultArr(){
            document.querySelectorAll(".arrow").forEach((ele)=> ele.style.display = "none");
        }
        if(sortAlgo){
            defaultArr();
            event.target.childNodes[1].style.display = "inline";
            sortType = event.target.id;
            showData()
            sortAlgo = false;
        }else{
            defaultArr();
            event.target.childNodes[2].style.display = "inline";
            sortType = event.target.id;
            showData()
            sortAlgo = true;
        }
        addBtn.style.display = "none";
        if(hiddenBtn != null) hiddenBtn.forEach((element)=> {
            element.style.display = "none"
        });
    })
})

function defaultPage(){
    location.reload();
}

let hiddenBtn = document.querySelectorAll(".hidden_btn");
function editOption(){
    firstPage.style.display = "block";
    secondPage.style.display = "none";
    addBtn.style.display = "flex";
    if(hiddenBtn != null) hiddenBtn.forEach((element)=> {
        element.style.display = "flex";
    });
}
function editPage(){
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    editflag = false;
    addflag = false;
    deleteflag = false;
}

// ------------------- edit product --------------------

if(document.querySelector(".edit_btn") != null)
document.querySelectorAll(".edit_btn").forEach((element)=>{
    element.addEventListener("click",(event)=>{
        editPage();
        editflag = true;
        editIndex = event.target.parentNode.parentNode.childNodes[1].innerHTML;
        let index = Number(editIndex);
        let tempObj = JSON.parse(localStorage.productData)[index];
        let productPrice = tempObj.productPrice;
        productPrice = productPrice.substring(0,productPrice.length-1);
        inputFieldData[0].value = tempObj.productName;
        inputFieldData[1].value = tempObj.imageLink,
        inputFieldData[2].value = Number(productPrice);
        inputFieldData[3].value = tempObj.productDesc;
        previewChanges();
    })
})

function editProduct(){
    let index = Number(editIndex);
    let tempObj = 
    {
        productId : editIndex,
        productName : inputFieldData[0].value,
        imageLink : inputFieldData[1].value,
        productPrice : inputFieldData[2].value + "₹",
        productDesc : inputFieldData[3].value,
    };
    let temp = JSON.parse(localStorage.getItem("productData"));
    temp[index] = tempObj;
    localStorage.setItem("productData", JSON.stringify(temp));
    if(alert("Your product Data is changed")) null;
    defaultPage();
}

// 

document.querySelector(".add_btn").addEventListener("click",()=>{
    console.log(true);
    editPage();
    addflag = true;
});

function addProduct(){
    let tempObj = 
    {
        productId : localStorage.getItem("crntId"),
        productName : inputFieldData[0].value,
        imageLink : inputFieldData[1].value,
        productPrice : inputFieldData[2].value + "₹",
        productDesc : inputFieldData[3].value
    };
    
    let temp = JSON.parse(localStorage.getItem("productData"));
    temp.push(tempObj);
    localStorage.setItem("productData", JSON.stringify(temp));
    let crntId = Number(tempObj.productId) + 1;
    localStorage.setItem("crntId", `${crntId}`);
    alert("A New Product Added Successfully")
}

// ------- delete Product  ----------------

function deleteProduct(){
    let index = Number(editIndex);
    let temp = JSON.parse(localStorage.getItem("productData"));
    let changeIndex = 0;
    temp = temp.filter((element, ind)=>{
        changeIndex = ind;
        return element.productId != `${index}`
    })
    temp.forEach((element, index)=>{
        element.productId = index; 
    })
    let usrAns = confirm("Are you sure want to delete product");
    if(usrAns){
        localStorage.productData = JSON.stringify(temp);
        localStorage.setItem('crntId',`${Number(localStorage.getItem('crntId')-1)}`);
        defaultPage();
    }
}

if(document.querySelectorAll(".delete_btn") != null)
document.querySelectorAll(".delete_btn").forEach((element)=>{
    element.addEventListener('click',(event)=>{
        deleteflag = true;
        editIndex = event.target.parentNode.parentNode.childNodes[1].innerHTML;
        deleteProduct();
    })
})

function resetChanges(){
    inputFieldData.forEach((element)=>{
        element.value = "";
    })
    document.querySelector("#preview_card").style.display = "none";
}

document.querySelector(".save_btn").addEventListener("click",()=>{
    if(inputFieldData[0].value == "" || inputFieldData[1].value == "" || inputFieldData[2].value == "" || inputFieldData[3].value == ""){
        alert("please Fill all details");
        return;
    }
    if(addflag) addProduct();
    else if(editflag) editProduct();
    resetChanges();
})

function previewChanges(){
    document.querySelector("#preview_card").style.display = "flex";
    let previewItems = document.querySelectorAll(".previewItems");
    previewItems[0].innerHTML = inputFieldData[0].value;
    previewItems[1].src = inputFieldData[1].value;
    previewItems[2].innerHTML = inputFieldData[2].value + "₹";
    previewItems[3].innerHTML = inputFieldData[3].value;
}

function cancelChanges(){
    defaultPage();
}