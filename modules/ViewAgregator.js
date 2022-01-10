export default class ViewAgregator {    
    // make correct Agregator without binding to DOM logic
    // encapsulate into 1 method - my note
    // add 3 parameter for Console

    constructor(viewsArray) {
        this.viewsArray = viewsArray;
    }
    
    openCreatePopup(callback) {
        this.viewsArray.forEach(item => item.openCreatePopup(callback))
    }

    reRenderList(callback) {
        this.viewsArray.forEach(item => item.reRenderList(callback))
    }

    bindAddTodo(callback) {
        this.viewsArray.forEach(item => item.bindAddTodo(callback))
    }

    bindDeleteTodo(callback) {
        this.viewsArray.forEach(item => item.bindDeleteTodo(callback))
    }

    bindUpdateTodo(callback) {
        this.viewsArray.forEach(item => item.bindUpdateTodo(callback))
    }

    bindSortDescending(callback) {
        this.viewsArray.forEach(item => item.bindSortDescending(callback))
    }

    bindUploadToStorage(callback) {
        this.viewsArray.forEach(item => item.bindUploadToStorage(callback));
    }

    bindGetFromStorage(callback) {
        this.viewsArray.forEach(item => item.bindGetFromStorage(callback))
    }
}