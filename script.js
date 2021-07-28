window.onload = function() {
    let listContainer = document.getElementsByClassName("list-content")[0];

    let addIcon = document.getElementsByClassName("add-icon")[0];
    let addContentButton = document.getElementsByClassName("create-item-button")[0];

    let uploadToStorageButton = document.getElementsByClassName("save-list")[0];
    let downloadFromStorage = document.getElementsByClassName("restore-list")[0];

    let listOfToDoes = [];

    addIcon.addEventListener("click", () => {
        openCreatePopup();
    })

    addContentButton.addEventListener("click", () => {
        addItem();
    })

    uploadToStorageButton.onclick = function() {
        uploadToStorage();
    }

    downloadFromStorage.onclick = function() {
        getFromStorage();
    }

    function Edit() {

        let classes = that.classList;
        let resClass = classes.filter((item) => {
            return typeof item.charAt(5) === Number;
        })
    }

    function openCreatePopup() {

        console.log('debugger');

        let modal = document.getElementById("myModal");

        let span = document.getElementsByClassName("close")[0];

        let createItemButton = document.getElementsByClassName("create-item-button")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }
        createItemButton.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function addItem() {

        let itemContent = document.querySelectorAll("#item-content")[0];
        let item = document.createElement("li");
        let uniqueID = new Date().getTime();
        item.className = "centered collection-item";
        item.innerHTML = `<div class="item-${uniqueID} item-wrapper">
                                <div class="content-wrapper">
                                    <p class="content-item item-${uniqueID}">${itemContent.value}</p>
                                </div>
                                <div class="perform-buttons-wrapper">
                                    <button class="btn-blue item-${uniqueID}">Edit</button>
                                </div>
                            </div>`;
        item.addEventListener("click", function(event) {


            let item = event.currentTarget;

            let liElement = event.path[3];

            if (item === liElement) {

                let content = liElement.querySelectorAll(".content-item")[0].textContent

                let innerDiv = item.querySelectorAll(".item-wrapper")[0]

                innerDiv.style.display = "none";

                let input = document.createElement('input');
                input.type = "string";
                input.value = content;
                input.onkeypress = "onKeyDown()"
                item.appendChild(input)

                input.addEventListener("keydown", function() {
                    if (window.event.keyCode == 13) {
                        input.style.display = "none"

                        let className = innerDiv.classList[0]; // переписати на більш стабільне
                        innerDiv.style.display = "block";
                        let elementToUpdate = document.querySelectorAll("p." + className)[0];
                        elementToUpdate.innerHTML = input.value;
                        debugger;
                        for (let index = 0; index < listOfToDoes.length; index++) {
                            if (listOfToDoes[index].ID === uniqueID) {
                                listOfToDoes[index].content = input.value;
                            }

                        }

                    }
                })
            }


        })

        let listEntity = { content: itemContent.value, ID: uniqueID }
        listContainer.appendChild(item);
        listOfToDoes.push(listEntity);
        console.log(listOfToDoes);

        itemContent.value = '';

    }

    function uploadToStorage() {
        localStorage.setItem("listOfToDoes", JSON.stringify(listOfToDoes));
    }

    function getFromStorage() {
        let storage = JSON.parse(localStorage.getItem("listOfToDoes"));
        listOfToDoes = storage;
        debugger;
        for (let i = 0; i < listOfToDoes.length; i++) {
            let tmpItem = document.createElement("li");
            tmpItem.className = "centered collection-item";
            tmpItem.innerHTML = `<div class="item-${listOfToDoes[i].ID} item-wrapper">
            <div class="content-wrapper">
                <p class="content-item item-${listOfToDoes[i].ID}">${listOfToDoes[i].content}</p>
            </div>
            <div class="perform-buttons-wrapper">
                <button class="btn-blue item-${listOfToDoes[i].ID}">Edit</button>
            </div>
        </div>`
            tmpItem.addEventListener("click", function(event) {


                let item = event.currentTarget;

                let liElement = event.path[3];

                if (item === liElement) {

                    let content = liElement.querySelectorAll(".content-item")[0].textContent

                    let innerDiv = item.querySelectorAll(".item-wrapper")[0]

                    innerDiv.style.display = "none";

                    let input = document.createElement('input');
                    input.type = "string";
                    input.value = content;
                    input.onkeypress = "onKeyDown()"
                    item.appendChild(input)

                    input.addEventListener("keydown", function() {
                        if (window.event.keyCode == 13) {
                            input.style.display = "none"

                            let className = innerDiv.classList[0]; // переписати на більш стабільне
                            innerDiv.style.display = "block";
                            let elementToUpdate = document.querySelectorAll("p." + className)[0];
                            elementToUpdate.innerHTML = input.value;
                            debugger;
                            for (let index = 0; index < listOfToDoes.length; index++) {
                                if (listOfToDoes[index].ID === listOfToDoes[i].ID) {
                                    listOfToDoes[index].content = input.value;
                                }

                            }

                        }
                    })
                }


            })

            listContainer.appendChild(tmpItem);
        }
    }

}