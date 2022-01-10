export default class ViewMediator {

    // make correct Agregator without binding to DOM logic

    constructor(viewsArray) {
        this.viewsArray = viewsArray;

        this.viewListContainer = document.getElementById("list-content");
        this.addContentButton = document.getElementsByClassName("create-item-button")[0];
        this.sortAscending = document.getElementsByClassName("sort")[0];
        this.uploadToStorageButton = document.getElementsByClassName("save-list")[0];
        this.downloadFromStorageButton = document.getElementsByClassName("restore-list")[0];
    }

    openCreatePopup(callback) {
        this.viewsArray.forEach(item => item.openCreatePopup(callback))
    }

    reRenderList(callback) {
        this.viewsArray.forEach(item => item.reRenderList(callback))
    }

    bindAddTodo(callback) {
        this.addContentButton.addEventListener("click", addItem.bind(this));

        function addItem() {
            this.viewsArray.forEach(item => item.bindAddTodo(callback))
            this.addContentButton.removeEventListener('click', addItem)
        }
    }

    bindDeleteTodo(callback) {
        this.viewListContainer.addEventListener('click', deleteItem.bind(this))

        function deleteItem(event) {
            if (event.target.classList.contains('remove-btn')) {
                this.viewsArray.forEach(item => item.bindDeleteTodo(callback))
            }
            this.viewListContainer.removeEventListener('click', deleteItem)
        }
    }

    bindUpdateTodo(callback) {
        this.viewListContainer.addEventListener('click', updateItem.bind(this))

        function updateItem(event){
            if (event.target.classList.contains('edit-btn')) {
                this.viewsArray.forEach(item => item.bindUpdateTodo(callback))
            }
            this.viewListContainer.removeEventListener('click', updateItem)
        }
    }

    bindSortDescending(callback) {
        this.sortAscending.addEventListener("click", sortAscending.bind(this));

        function sortAscending(){
            this.viewsArray.forEach(item => item.bindSortDescending(callback))
            this.sortAscending.removeEventListener("click", sortAscending)
        }
    }

    bindUploadToStorage(callback) {
        this.uploadToStorageButton.addEventListener('click', uploadToStorage.bind(this));

        function uploadToStorage(){
            this.viewsArray.forEach(item => item.bindUploadToStorage(callback));
            this.uploadToStorageButton.removeEventListener('click', uploadToStorage)
        }
    }

    bindGetFromStorage(callback) {
        this.downloadFromStorageButton.addEventListener('click', downloadFromStorage.bind(this));

        function downloadFromStorage(){
            this.viewsArray.forEach(item => item.bindGetFromStorage(callback))
            this.downloadFromStorageButton.removeEventListener('click', downloadFromStorage)
        }
    }
}