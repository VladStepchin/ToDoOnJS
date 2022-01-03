class Storage {
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    set item(itemToStore) {
        this.storage.setItem("todoList", JSON.stringify(itemToStore));
    }

    get item() {
        let list = JSON.parse(this.storage.getItem("todoList"));
        list.forEach(item => item.date = new Date(item.date))
        return list;
    }
}

class TodoListModel {
    constructor(todoList) {
        this.todoList = todoList;
        //change to Map to get rid of find()?
    }
    // leave return this.todoList or these functions should return nothing
    // return item not the whole list
    create(item) {
        this.todoList.push(item)
        return this.todoList; // return this
    }

    update(itemId, newValue) {
        const itemToUpdate = this.todoList.find(item => item.ID === itemId)
        itemToUpdate.content = newValue;
        return this.todoList; // return this
    }

    delete(itemId) {
        this.todoList = this.todoList.filter(item => item.ID !== itemId);
        return this.todoList;
    }

    sortByDateDescending() {
        this.todoList.sort((a, b) => b.ID - a.ID)
        return this.todoList;
    }

    get TodoList() {
        return this.todoList;
    }

    set TodoList(newList) {
        this.todoList = [...newList];
    }
}

class TodoListView {
    constructor(viewListContainer) {
        this.viewListContainer = viewListContainer;

        // action buttons
        this.addIcon = document.getElementsByClassName("add-icon")[0];
        this.addContentButton = document.getElementsByClassName("create-item-button")[0];
        this.sortAscending = document.getElementsByClassName("sort")[0];
        this.uploadToStorageButton = document.getElementsByClassName("save-list")[0];
        this.downloadFromStorageButton = document.getElementsByClassName("restore-list")[0];

        // popup DOM elements
        this.popupWindow = document.getElementById("myModal");
        this.closeIcon = document.getElementsByClassName("close")[0];
        this.createItemButton = document.getElementsByClassName("create-item-button")[0];
    }

    openCreatePopup() {
        this.addIcon.onclick = () => {
            this.popupWindow.style.display = "block";
            this.closeIcon.onclick = () => this.popupWindow.style.display = "none"
            this.createItemButton.onclick = () => this.popupWindow.style.display = "none"
        }
    }

    generateItemMarkup(ID, content, currentDate) {
        const date = `${currentDate.getFullYear()}-${this.numberDecorator(currentDate.getMonth() + 1)}-${this.numberDecorator(currentDate.getDate())}`;
        const time = `${this.numberDecorator(currentDate.getHours())}:${this.numberDecorator(currentDate.getMinutes())}:${this.numberDecorator(currentDate.getSeconds())}`;
        const userFriendlyDateTime = `${date} ${time}`;
        return this.renderItem(ID, content, userFriendlyDateTime)
    }

    numberDecorator(number) {
        return number < 10 ? '0' + number : number;
    }

    renderItem(ID, content, userFriendlyDateTime) {
        return content ? `<div class="item-${ID} item-wrapper">
            <div class="content-wrapper">
                <p class="content-item item-${ID}"><b>${content}</b></p>
                <p class="date">Date: ${userFriendlyDateTime}</p>
            </div>
            <div class="perform-buttons-wrapper">
                <button data-id=${ID} class="btn btn-red edit-btn item-${ID}">Edit</button>
                <button data-id=${ID} class="btn btn-blue remove-btn item-${ID}">Remove</button>
            </div>
        </div>` : alert("Error")
    }

    bindAddTodo(callback) {
        this.addContentButton.addEventListener("click", () => {
            const currentDate = new Date();
            const contentFromInput = document.getElementById("item-content");
            const newListItem = this.createListElement();
            const uniqueID = new Date().getTime();

            newListItem.innerHTML = this.generateItemMarkup(uniqueID, contentFromInput.value, currentDate);

            const newContentItem = { content: contentFromInput.value, ID: uniqueID, date: currentDate }
            contentFromInput.value = '';

            return callback(newContentItem);
        })
    }

    bindDeleteTodo(callback) {
        // best practise to remove event listener
        this.viewListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const id = parseInt(event.target.dataset.id)
                callback(id)
            }
        })
    }

    bindUpdateTodo(callback) {
        this.viewListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const id = parseInt(event.target.dataset.id)
                this.openInlineEditing(id, callback)
            }
        })
    }

    bindSortDescending(callback) {
        this.sortAscending.onclick = () => {
            callback();
        }
    }

    bindUploadToStorage(callback) {
        this.uploadToStorageButton.onclick = () => {// this.uploadtostoragebutton.onclick = callback everywhere!!!!!!
            callback()
        }
    }

    bindUploadToStorage(callback) {
        this.uploadToStorageButton.onclick = () => {
            callback()
        }
    }

    bindGetFromStorage(callback) {
        this.downloadFromStorageButton.onclick = () => {
            callback();
        }
    }

    toogleDisplay(el) {
        el.style.display = (el.style.display === "") ? "none" : "";
    }

    openInlineEditing(uniqueID, callback) {
        const itemContent = document.querySelectorAll(`.content-item.item-${uniqueID}`)[0].textContent;
        const newListItem = this.createListElement();

        const listItem = document.querySelectorAll(`.item-${uniqueID}.item-wrapper`)[0].parentElement
        this.toogleDisplay(listItem)

        let input = document.createElement('input');
        input.type = "string";
        input.value = itemContent;
        input.onkeypress = "onKeyDown()"

        newListItem.appendChild(input)
        this.viewListContainer.appendChild(newListItem);

        input.onkeydown = () => {
            if (window.event.keyCode !== 13)
                return null

            this.toogleDisplay(input);
            this.toogleDisplay(listItem);
            callback(uniqueID, input.value)
        }
    }

    createListElement() {
        const listItem = document.createElement('li');
        listItem.className = "centered collection-item";
        return listItem;
    }

    reRenderList(listOfTodoes) {
        this.viewListContainer.innerHTML = ' ';

        if (!listOfTodoes.length)
            return null

        listOfTodoes.forEach(item => {
            let tmpItem = document.createElement("li");
            tmpItem.className = "centered collection-item";
            tmpItem.innerHTML = this.generateItemMarkup(item.ID, item.content, item.date)

            this.viewListContainer.appendChild(tmpItem);
        })
    }
}

class Agregator {
    constructor(todoListModel, todoListView, storage) {

        this.todoListModel = todoListModel;
        this.todoListView = todoListView;
        this.storage = storage;

        this.todoListView.bindAddTodo(this.handlerAddTodo); // this.handleAddTodo.bind(this) rebind to Controller

        this.todoListView.bindDeleteTodo(this.handleDeleteTodo);
        this.todoListView.bindUpdateTodo(this.handleUpdateTodo);
        this.todoListView.bindSortDescending(this.handleSortDescending);
        this.todoListView.bindUploadToStorage(this.handleUploadToStorage);
        this.todoListView.bindGetFromStorage(this.handleGetFromStorage);

        this.todoListView.openCreatePopup();
    }

    getTodoList() {
        return this.todoListModel.TodoList;
    }

    setTodoList(newList) {
        this.todoListModel.TodoList = newList;
        this.todoListView.reRenderList(this.todoListModel.TodoList);
    }

    handleTodoListChange = list => {
        this.todoListView.reRenderList(list);
    }

    handlerAddTodo = item => {
        // this.todoListModel.create(item).getCurrentState => should return list of items (Array.from('set'))
        this.todoListView.reRenderList(this.todoListModel.create(item))
    }

    handleUpdateTodo = (id, item) => {
        this.todoListView.reRenderList(this.todoListModel.update(id, item))
    }

    handleDeleteTodo = id => {
        this.todoListView.reRenderList(this.todoListModel.delete(id));
    }

    handleSortDescending = () => {
        this.todoListView.reRenderList(this.todoListModel.sortByDateDescending())
    }

    handleUploadToStorage = () => {
        this.storage.item = this.todoListModel.TodoList;
    }

    handleGetFromStorage = () => {
        this.todoListModel.TodoList = this.storage.item;
        this.todoListView.reRenderList(this.todoListModel.TodoList);
    }
}

const todoList = [];
const containerForList = document.getElementById("list-content");

const agregator = new Agregator(new TodoListModel(todoList), new TodoListView(containerForList), new Storage(localStorage));

// different js files
// Read about Mediator(pattern) !!!!
// add logs for model actions. Change View to Console (to add everyhting to console.log())
// create two calsses todolistconsoleView writes everyhting in console
// second class ViewAgregator takes array of views and have the same methods i from the Views. CHANGE TodoListView to ViewAgregator


