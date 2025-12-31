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

// // Select DOM elements
// const allContent = document.querySelector(".all-content");
// const ulList = document.querySelector(".info");
// const contentData = document.querySelector(".content"); // Fixed typo

// // Loading feedback
// function showLoading(container, message = "Loading...") {
//     container.innerHTML = `<p class="loading">${message}</p>`;
// }

// function showError(container, message) {
//     container.innerHTML = `<p class="error">${message}</p>`;
// }

// // Fetch users
// async function getDataPersonal(url) {
//     showLoading(ulList, "Loading users...");

//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
//         const data = await response.json();
//         createListOfName(data);
//     } catch (error) {
//         showError(ulList, "Failed to load users. Please try again.");
//         console.error("Error fetching users:", error);
//     }
// }

// // Create user list
// function createListOfName(users) {
//     ulList.innerHTML = ""; // Clear previous

//     users.forEach(user => {
//         const li = document.createElement("li");
        
//         const h2 = document.createElement("h2");
//         h2.className = "name";
//         h2.textContent = user.name;

//         const p = document.createElement("p");
//         p.className = "email";
//         p.textContent = user.email;

//         li.appendChild(h2);
//         li.appendChild(p);

//         // Attach user ID via dataset
//         li.dataset.userId = user.id;

//         li.addEventListener("click", () => {
//             selectUser(li);
//             filterNameGet(user.id);
//         });

//         ulList.appendChild(li);
//     });
// }

// // Highlight selected user
// function selectUser(selectedLi) {
//     document.querySelectorAll(".info li").forEach(li => {
//         li.classList.remove("selected");
//     });
//     selectedLi.classList.add("selected");
// }

// // Fetch posts for a user
// async function filterNameGet(userId) {
//     showLoading(contentData, "Loading posts...");

//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);

//         const posts = await response.json();
//         createContentDiv(posts);
//     } catch (error) {
//         showError(contentData, "Failed to load posts.");
//         console.error("Error fetching posts:", error);
//     }
// }

// // Render posts
// function createContentDiv(posts) {
//     contentData.innerHTML = ""; // Always clear

//     if (posts.length === 0) {
//         contentData.innerHTML = "<p>No posts found.</p>";
//         return;
//     }

//     posts.forEach(post => {
//         const div = document.createElement("div");
//         div.className = "data";

//         const h3 = document.createElement("h3");
//         h3.textContent = post.title;

//         const p = document.createElement("p");
//         p.textContent = post.body;

//         div.appendChild(h3);
//         div.appendChild(p);
//         contentData.appendChild(div);
//     });
// }

// // Start the app
// getDataPersonal("https://jsonplaceholder.typicode.com/users");