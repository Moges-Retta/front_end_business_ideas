"use strict";
document.getElementById("technicalError").style.display = "none";
const catagoryUrl = "https://projectethio.herokuapp.com/catagories";
const productUrl = "https://projectethio.herokuapp.com/products/";

var catagoryUrlkey = sessionStorage.getItem("catagoryUrl");
var catagoryName =sessionStorage.getItem("catagoryName");
var idSelected =sessionStorage.getItem("projectId");
var catagoryId =sessionStorage.getItem("catagoryId");
var catagoryList = sessionStorage.getItem("catagories");

if (idSelected!=null&&catagoryUrlkey!=null&&catagoryName!=null){
    var urlProduct = productUrl.concat(idSelected.toString());
    readProductsWithUrl(catagoryUrlkey,catagoryName)
}else {
    technicalError();
}

readProductsWithUrl(catagoryUrlkey,catagoryName)

if(catagoryList==null){
    readCatagories()
}else{
    enterDetailsOf(JSON.parse(catagoryList));
}
async function readProductsWithUrl(urlProducts,catagory) {
    try {
        const response = await fetch(urlProducts);
        if (response.ok) {
            const productList = await response.json();
            DetailsOf(productList,catagory);
        } else {
            technicalError();
        }
    } catch {
        technicalError();
    }
}
// make list of projects under a catagory
function DetailsOf(productList,catagory) {
    var h4 = document.getElementsByClassName("left")[0].getElementsByTagName("h4")[0];;
    h4.innerText=catagory;
    h4.classList="h4";
    var ul = document.getElementsByClassName("left")[0].getElementsByTagName("ul")[0];
    while (ul.lastChild !== null) { ul.lastChild.remove(); }
    for (const product of productList._embedded.productIdNameList) {
        const li = makeLiForProduct(product.name, product.id, product.id==productList._embedded.productIdNameList[0].id);
        li.dataset.category = product.catagory;
        ul.appendChild(li);
    }
}
// make a list of projects
function makeLiForProduct(name, id,firstproject) {
    var Url = productUrl.concat(id.toString());
    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.innerText = name;
    hyperlink.href = "#";
    hyperlink.dataset.url = Url;
    if(firstproject){
        readProductDetailWithUrl(Url);
    }
    if(idSelected!=null){
        var urlProduct = productUrl.concat(idSelected.toString());
        readProductDetailWithUrl(urlProduct);
        sessionStorage.removeItem("projectId")
    }
    hyperlink.onclick = function () {
        readProductDetailWithUrl(this.dataset.url);
    };
    li.appendChild(hyperlink);

    return li;
}
async function readProductDetailWithUrl(urlProductsDetail) {
    try {
        const response = await fetch(urlProductsDetail);
        if (response.ok) {
            const product = await response.json();
            DescriptionOf(product);
        } else {
            technicalError();
        }
    } catch {
        technicalError();
    }
}
// fill details of the product
function DescriptionOf(product) {
    var dl = document.getElementById("productDetail");
    while (dl.lastChild !== null) { dl.lastChild.remove(); }
    const dt1 = document.createElement("h3");
    dt1.innerText=product.title;
    const dd1 =document.createElement("dd");
    dd1.innerText="";
    dl.appendChild(dt1);
    dl.appendChild(dd1);

    if((product.description).toString()!=" ") {

        const dt2 = document.createElement("h4");
        dt2.innerText = "Introduction";
        const dd2 = document.createElement("dd");
        dd2.innerText = product.description;
        dl.appendChild(dt2);
        dl.appendChild(dd2);
    }

    if((product.rationale).toString()!=" "){
        const dt3 =document.createElement("h4");
    dt3.innerText="Rationale";
    const dd3 =document.createElement("dd");
    dd3.innerText=product.rationale;
    dl.appendChild(dt3);
    dl.appendChild(dd3);
    }
    if((product.marketPotential).toString()!=" ") {

        const dt4 = document.createElement("h4");
        dt4.innerText = "Market Potential";
        const dd4 = document.createElement("dd");
        dd4.innerText = product.marketPotential;
        dl.appendChild(dt4);
        dl.appendChild(dd4);
    }

    if((product.rawMaterial).toString()!=" ") {

        const dt5 = document.createElement("h4");
        dt5.innerText = "Raw Material";
        const dd5 = document.createElement("dd");
        dd5.innerText = product.rawMaterial;
        dl.appendChild(dt5);
        dl.appendChild(dd5);
    }
    if((product.technology).toString()!=" ") {

        const dt6 = document.createElement("h4");
        dt6.innerText = "Technology";
        const dd6 = document.createElement("dd");
        dd6.innerText = product.technology;
        dl.appendChild(dt6);
        dl.appendChild(dd6);
    }
    if((product.benefits).toString()!=" ") {

        const dt7 = document.createElement("h4");
        dt7.innerText = "Benefits";
        const dd7 = document.createElement("dd");
        dd7.innerText = product.benefits;
        dl.appendChild(dt7);
        dl.appendChild(dd7);
    }

    const dt8 =document.createElement("h4");
    dt8.innerText="Detail study";
    const dd8 =document.createElement("dd");
    const a = document.createElement("a");
    a.target="_blank";
    a.rel="noopener noreferrer";
    a.href="https://sites.google.com/site/projectethio/";
    a.classList="btn btn-success btn-lg"
    const span =document.createElement("span");
    span.classList="glyphicon glyphicon-download";
    span.innerText="Download";
    a.appendChild(span);
    dd8.appendChild(a);
    dl.appendChild(dt8);
    dl.appendChild(dd8);
}


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
    for (const catagory of catagories._embedded.catagoryIdNameList) {
        var url = catagory._links.self.href;
        if(url.match('^http://')){
            url = url.replace("http://","https://")
        }

        const a = makeHyperlinkWith(catagory.name, url);

        div.appendChild(a);
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
        const d =this.dataset.url;
            sessionStorage.setItem("catagoryUrl",this.dataset.url)
        sessionStorage.setItem("catagoryName",this.innerText)
    };
    return hyperlink;
}
function technicalError() {
    document.getElementById("technicalError").hidden = false;
}
document.getElementById("mainSearch").onclick=function (){
    var keyword = document.getElementById("keyword").value;
    document.searchForm.action = "search.html";
    sessionStorage.setItem('keyword', keyword);
}