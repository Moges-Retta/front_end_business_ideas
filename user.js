"use strict";
document.getElementById("technicalError").style.display = "none";
const registerUrl = "http://localhost:8080/register";
const registerForm = document.getElementById("register");
registerForm.addEventListener("submit", handleFormSubmit);

document.getElementById("register").onsubmit = function() {
    document.getElementById("registerButton").disabled = true;
}
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = registerUrl;
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson(url, formData);
    } catch {
        technicalError();
    }
}
async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const email = plainFormData.email;
    const id = await checkUserWith(email);
    if(id){
        show(-1);
        throw new Error("use another email!");
    }else{
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: formDataJsonString
        };
        const response = await fetch(url, fetchOptions);
        if(response.ok){
            process(response)
        }else{
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        return response.json();
    }
}

async function checkUserWith(email) {
    const url = registerUrl.concat("/").concat(email);
    const id = await fetch(url);
    return id;
}

function technicalError() {
    document.getElementById("technicalError").hidden = false;
}
function process(response){
    var code = response.headers.get("Location");
    if(code){
        var location = code.toString().lastIndexOf("/");
        var id = code.substring(location);
        show(id);
    }else{
        show(0);
    }
}
function show(id){
    var span = document.getElementById("sucess");
    if(id==0){
        span.innerHTML = "<h4 class='error'>Registration Not sucessful</h4>";
    }else if(id==-1){
        span.innerHTML = "<h4 class='error'>This email address is already used!</h4>";
        document.getElementById("registerButton").disabled = false;
    }else{
        span.innerHTML = "<h4 class='sucess'>Registration sucessful</h4>";
        document.getElementById("registerButton").disabled = false;
    }
}