"use strict";

document.getElementById("technicalError").style.display = "none";
const catagoryUrl = "https://projectethio.herokuapp.com/catagories";
const searchUrl = "https://projectethio.herokuapp.com/search?keyword=";
const textSearchButton = document.getElementById("mainSearch");
const productUrl = "https://projectethio.herokuapp.com/products/";

var idRandom = Math.floor((Math.random() * 16) + 1);
var urlProducts = catagoryUrl.concat("/").concat(idRandom.toString());

var catagoryList = sessionStorage.getItem("catagories");// avoid request to database

if(catagoryList==null){
    readCatagories()
}else{
    enterDetailsOf(JSON.parse(catagoryList));
}

readProductsWithUrl(urlProducts)

async function readCatagories() {
    try {
        const response = await fetch(catagoryUrl);
        if (response.ok) {
            const catagories = await response.json();
            sessionStorage.setItem("catagories",JSON.stringify(catagories));
            enterDetailsOf(catagories);
        } else {
            technicalError();
        }
    } catch {
        technicalError();
    }
}

// make nav bar from reading the catagories table
function enterDetailsOf(catagories) {
    var div = document.getElementById("ideas");//.getElementsByTagName("ul")[0];
    var divG = document.getElementById("groupList");//.getElementsByTagName("ul")[0];
    for (const catagory of catagories._embedded.catagoryIdNameList) {
        var url = catagory._links.self.href;
        if(url.match('^http://')){
            url = url.replace("http://","https://")
        }
        const a = makeHyperlinkWith(catagory.name, url);
        const form = makeFormWith(catagory.name, url,catagory.count);
        div.appendChild(a);
        divG.appendChild(form);
    }
}
// make a list of catagorues
function makeHyperlinkWith(name, url) {
    const hyperlink = document.createElement("a");
    hyperlink.innerText = name;
    hyperlink.href = "ideas.html";
    hyperlink.dataset.url = url;
    hyperlink.classList="dropdown-item";
    hyperlink.onclick = function () {
        sessionStorage.setItem("catagoryUrl",this.dataset.url)
        sessionStorage.setItem("catagoryName",this.innerText)
    };
    return hyperlink;
}
// make a list of catagorues
function makeFormWith(name, url,count) {
    const form = document.createElement("form");
    const button = document.createElement("button");

    if(count!=0){
        button.innerText = name.toString().concat("(").concat(count.toString()).concat(")");
    } else{
        button.innerText = name.toString();
    }
    form.action = "ideas.html";
    form.method="get";
    button.dataset.url = url;
    button.classList="btn btn-info btn-sm";
    button.onclick = function () {
        sessionStorage.setItem("catagoryUrl",this.dataset.url)
        sessionStorage.setItem("catagoryName",name)
    };
    form.appendChild(button);
    return form;
}

function technicalError() {
    document.getElementById("technicalError").hidden = false;
}
document.getElementById("mainSearch").onclick=function (){
    var keyword = document.getElementById("keyword").value;
    document.searchForm.action = "search.html";
    sessionStorage.setItem('keyword', keyword);
}

// making a least of featured projects
async function readProductsWithUrl(urlProducts) {
    try {
        const response = await fetch(urlProducts);
        if (response.ok) {
            const productList = await response.json();
            DetailsOf(productList);
        } else {
            technicalError();
        }
    } catch {
        technicalError();
    }
}
// make list of projects under a catagory
function DetailsOf(productList) {
    var ul = document.getElementsByClassName("featured")[0].getElementsByTagName("ul")[0];
    while (ul.lastChild !== null) { ul.lastChild.remove(); }
    for (const product of productList._embedded.productIdNameList) {
        const li = makeLiForProduct(product.name, product.id,product.category,product.categoryId);
        li.dataset.category = product.catagory;
        ul.appendChild(li);
    }
}
// make a list of projects
function makeLiForProduct(name, id,catagorySelected,categoryId) {
    var Url = productUrl.concat(id.toString());
    var Url = catagoryUrl.concat(id.toString());

    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.innerText = name;
    hyperlink.href = "ideas.html";
    hyperlink.dataset.url = Url;
    hyperlink.dataset.id = id;
    hyperlink.onclick = function () {
        sessionStorage.setItem("projectId",this.dataset.id);
        sessionStorage.setItem("catagoryName",catagorySelected);
        sessionStorage.setItem("catagoryUrl",catagoryUrl.concat("/").concat(categoryId.toString()))

    };
    li.appendChild(hyperlink);

    return li;
}

