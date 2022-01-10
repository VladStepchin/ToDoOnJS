export default class Agregator {
    constructor(todoListModel, viewAgregator, storage) {
        this.todoListModel = todoListModel;
        this.viewAgregator = viewAgregator;
        this.storage = storage;
    }

    run(){
        this.viewAgregator.bindAddTodo(this.handlerAddTodo.bind(this));
        this.viewAgregator.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.viewAgregator.bindUpdateTodo(this.handleUpdateTodo.bind(this));
        this.viewAgregator.bindSortDescending(this.handleSortDescending.bind(this));
        this.viewAgregator.bindUploadToStorage(this.handleUploadToStorage.bind(this));
        this.viewAgregator.bindGetFromStorage(this.handleGetFromStorage.bind(this));

        this.viewAgregator.openCreatePopup();
    }

    handlerAddTodo(item) {  
        this.viewAgregator.reRenderList(this.todoListModel.create(item).currentState);
    }

    handleUpdateTodo(id, item){
        this.viewAgregator.reRenderList(this.todoListModel.update(id, item).currentState);
    }

    handleDeleteTodo(id){
        this.viewAgregator.reRenderList(this.todoListModel.delete(id).currentState);
    }

    handleSortDescending(){
        this.viewAgregator.reRenderList(this.todoListModel.sortByDateDescending().currentState);
    }

    handleUploadToStorage(){
        this.storage.item = this.todoListModel.currentState;
    }

    handleGetFromStorage(){
        this.todoListModel.currentState = this.storage.item;
        this.viewAgregator.reRenderList(this.todoListModel.currentState);
    }
}