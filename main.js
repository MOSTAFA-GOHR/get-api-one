let allContent = document.querySelector(".all-content");
let ulList =document.querySelector(".info");
let contetnData = document.querySelector(".content");


function getDataPersonal(url){
    let request = new XMLHttpRequest();
    request.open("GET",url);
    request.responseType='json';
    request.send();
    request.onload =function(){
        if(request.status >=200 && request.status <300){
        CreateListOfName(request.response);
        }else{
            alert("error: there are a problem in the api")
        }
    }

}


getDataPersonal("https://jsonplaceholder.typicode.com/users");


// create the list of name and email
function CreateListOfName(response){
    // do not forget the loop on the list of  api list as array wrapping all item in list to make ul
    for(let i=0 ; i<response.length ; i++){
        let listLi = document.createElement("li");
        let createh2 = document.createElement("h2");
        createh2.className = "name";
        createh2.appendChild(document.createTextNode(response[i].name));
        listLi.appendChild(createh2)
        let createP = document.createElement("p");
        createP.className = "email";
        createP.appendChild(document.createTextNode(response[i].email));
        listLi.appendChild(createP);
        ulList.appendChild(listLi);
        listLi.addEventListener("click", function () {
            filterNameGet(response[i].id);
            selectedElement(this);
        });
    }
}



function selectedElement(ele){
    let elementsRe=Array.from(document.getElementsByClassName("selected"));
    elementsRe.forEach(element=>{
        element.classList.remove("selected");
    })
    ele.classList.add("selected");
}

function filterNameGet(id){
    let request = new XMLHttpRequest();
    request.open("GET",`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    request.responseType='json';
    request.send();
    request.onload =function(){
        if(request.status >=200 && request.status <300){
        let responseOne=request.response;
        createContentDiv(responseOne);

        }else{
            alert("error: there are a problem in the api filter")
        }
    }
}

function createContentDiv(response){
    contetnData.innerHTML="";
    for(let i = 0 ; i < response.length ;i++){
        let createDataDiv = document.createElement("div");
        createDataDiv.className = "data";

        let h3Title = document.createElement("h3");
        h3Title.textContent=response[i].title;
        createDataDiv.appendChild(h3Title);

        let pBody = document.createElement("p");
        pBody.textContent=response[i].body;
        createDataDiv.appendChild(pBody);

        contetnData.appendChild(createDataDiv)
    }
}
