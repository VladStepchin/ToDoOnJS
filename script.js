window.onload = function() {
    let listContainer = document.getElementById("list-content");

    let addIcon = document.getElementsByClassName("add-icon")[0];
    let addContentButton = document.getElementsByClassName("create-item-button")[0];

    let uploadToStorageButton = document.getElementsByClassName("save-list")[0];
    let sortAscending = document.getElementsByClassName("sort")[0];
    let downloadFromStorage = document.getElementsByClassName("restore-list")[0];

    let listOfToDoes = [];

    function initializeEventListener(htmlElement, event, action) {
        htmlElement.addEventListener(event, () => {
            action();
        })
    }

    initializeEventListener(addIcon, "click", openCreatePopup)
    initializeEventListener(addContentButton, "click", addItem)
    initializeEventListener(uploadToStorageButton, "click", uploadToStorage)
    initializeEventListener(downloadFromStorage, "click", getFromStorage)
    initializeEventListener(sortAscending, "click", sortByDateDescending)

    function openCreatePopup() {

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

    function generateItemMarkup(ID, content, currentDate) {

        let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

        let dateTime = date + ' ' + time;

        return content ? `<div class="item-${ID} item-wrapper">
                    <div class="content-wrapper">
                        <p class="content-item item-${ID}">${content}</p>
                        <p class="date">${dateTime}</p>
                    </div>
                    <div class="perform-buttons-wrapper">
                        <button class="btn-blue item-${ID}">Edit</button>
                    </div>
                </div>` : alert("Error")
    }

    function addItem() {

        let currentDate = new Date();


        let contentFromInput = document.getElementById("item-content");
        let newListItem = document.createElement("li");
        let uniqueID = new Date().getTime();

        newListItem.className = "centered collection-item";
        newListItem.innerHTML = generateItemMarkup(uniqueID, contentFromInput.value, currentDate);

        defineItemEditing(newListItem, uniqueID)

        let listEntity = { content: contentFromInput.value, ID: uniqueID, date: currentDate }
        listContainer.appendChild(newListItem);
        listOfToDoes.push(listEntity);
        console.log(listOfToDoes);
        contentFromInput.value = '';

    }

    function isInputClicked(event) {
        return event.path[0].nodeName == "INPUT"
    }

    function updateListModel(uniqueID, value) {
        for (let index = 0; index < listOfToDoes.length; index++) {
            if (listOfToDoes[index].ID === uniqueID) {
                listOfToDoes[index].content = value;
            }
        }
    }

    function toogleDisplay(el) {
        el.style.display = (el.style.display === "") ? "none" : "";
    }

    function openInlineEditing(newListItem, itemToEdit) {

        let innerDiv = newListItem.querySelectorAll(".item-wrapper")[0]

        toogleDisplay(innerDiv)

        let input = document.createElement('input');
        input.type = "string";
        console.log(itemToEdit);
        input.value = itemToEdit.content;

        input.onkeypress = "onKeyDown()"

        newListItem.appendChild(input)

        input.addEventListener("keydown", function() {

            if (window.event.keyCode == 13) {

                toogleDisplay(input);
                toogleDisplay(innerDiv);
                let elementToUpdate = document.querySelectorAll(`p.item-${itemToEdit.ID}`)[0];
                elementToUpdate.innerHTML = input.value;

                updateListModel(itemToEdit.ID, input.value)
            }
        })
    }

    function defineItemEditing(newListItem, uniqueID) {
        newListItem.addEventListener("click", function(event) {

            let itemToEdit = listOfToDoes.filter(function(item) {
                return item.ID == uniqueID
            })[0]

            if (!isInputClicked(event)) {
                openInlineEditing(newListItem, itemToEdit);
            }

        })
    }

    function uploadToStorage() {
        localStorage.setItem("listOfToDoes", JSON.stringify(listOfToDoes));
    }

    function reRenderList() {
        for (let i = 0; i < listOfToDoes.length; i++) {

            let tmpItem = document.createElement("li");
            tmpItem.className = "centered collection-item";
            tmpItem.innerHTML = generateItemMarkup(listOfToDoes[i].ID, listOfToDoes[i].content, listOfToDoes[i].date)

            defineItemEditing(tmpItem, listOfToDoes[i].ID)

            listContainer.appendChild(tmpItem);
        }
    }

    function getFromStorage() {

        let storage = JSON.parse(localStorage.getItem("listOfToDoes"));

        storage.map(function(item, i, arr) {

            let date = new Date(arr[i].date)

            date.setDate(date.getDate() + 7)

            return arr[i].date = date;
        })

        listOfToDoes = storage;

        reRenderList();
    }

    function sortByDateDescending() {

        listOfToDoes.sort(function(a, b) {
            return b.ID - a.ID;
        })

        let mainUL = document.getElementById("list-content");

        while (mainUL.firstChild)
            mainUL.removeChild(mainUL.firstChild)

        reRenderList();
    }

}