"use strict";
document.getElementById("technicalError").style.display = "none";
const searchUrl = "https://projectethio.herokuapp.com/search?keyword=";
const productUrl = "https://projectethio.herokuapp.com/products/";

var keyword = sessionStorage.getItem("keyword");

if(keyword==null){
    technicalError();
}else{
    sessionStorage.removeItem("keyword");
}
var url = searchUrl.concat(keyword);
readProductsWithUrl(url)

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
function DetailsOf(productList) {
    var ul = document.getElementsByClassName("left")[0].getElementsByTagName("ul")[0];
    var h3 = document.createElement("h3");
    h3.innerText="Search results";
    while (ul.lastChild !== null) { ul.lastChild.remove(); }
    ul.append(h3);
    for (const product of productList._embedded.productIdNameList) {
        const li = makeLiForProduct(product.name, product.id);
        li.dataset.category = product.catagory;
        ul.appendChild(li);
    }
}
// read one product form the list of search results
var foo = true;
// make a list of projects
function makeLiForProduct(name, id) {
    var Url = productUrl.concat(id.toString());
    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.innerText = name;
    hyperlink.href = "#";
    hyperlink.dataset.url = Url;
    hyperlink.onclick = function () {
        readProductDetailWithUrl(this.dataset.url);
    };
    li.appendChild(hyperlink);
    // read one product form the list of search results
    if(foo){
        readProductDetailWithUrl(Url);
        foo=false;
    }

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
// make list of projects under a catagory
function DetailsOf(productList) {
    var ul = document.getElementsByClassName("left")[0].getElementsByTagName("ul")[0];
    while (ul.lastChild !== null) { ul.lastChild.remove(); }
    for (const product of productList._embedded.productIdNameList) {
        const li = makeLiForProduct(product.name, product.id);
        li.dataset.category = product.catagory;
        ul.appendChild(li);
    }
}
function technicalError() {
    document.getElementById("technicalError").hidden = false;
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

    const dt2 =document.createElement("h4");
    dt2.innerText="Introduction";
    const dd2 =document.createElement("dd");
    dd2.innerText=product.description;
    dl.appendChild(dt2);
    dl.appendChild(dd2);

    const dt3 =document.createElement("h4");
    dt3.innerText="Rationale";
    const dd3 =document.createElement("dd");
    dd3.innerText=product.rationale;
    dl.appendChild(dt3);
    dl.appendChild(dd3);

    const dt4 =document.createElement("h4");
    dt4.innerText="Market Potential";
    const dd4 =document.createElement("dd");
    dd4.innerText=product.marketPotential;
    dl.appendChild(dt4);
    dl.appendChild(dd4);

    const dt5 =document.createElement("h4");
    dt5.innerText="Raw Material";
    const dd5 =document.createElement("dd");
    dd5.innerText=product.rawMaterial;
    dl.appendChild(dt5);
    dl.appendChild(dd5);

    const dt6 =document.createElement("h4");
    dt6.innerText="Technology";
    const dd6 =document.createElement("dd");
    dd6.innerText=product.technology;
    dl.appendChild(dt6);
    dl.appendChild(dd6);

    const dt7 =document.createElement("h4");
    dt7.innerText="Benefits";
    const dd7 =document.createElement("dd");
    dd7.innerText=product.benefits;
    dl.appendChild(dt7);
    dl.appendChild(dd7);

    const dt8 =document.createElement("h4");
    dt8.innerText="Detail study";
    const dd8 =document.createElement("dd");
    const a = document.createElement("a");
    a.innerText="Download";
    a.target="_blank";
    a.rel="noopener noreferrer";
    a.href="http://www.projectethio.com/";
    a.classList="btn btn-success btn-lg"
    dd8.appendChild(a);
    dl.appendChild(dt8);
    dl.appendChild(dd8);
}
document.getElementById("mainSearch").onclick=function (){
    var keyword = document.getElementById("keyword").value;
    document.searchForm.action = "search.html";
    sessionStorage.setItem('keyword', keyword);
}