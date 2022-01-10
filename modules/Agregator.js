export default class Agregator {
    // viewMediator => viewAgregator
    constructor(todoListModel, viewMediator, storage) {
        this.todoListModel = todoListModel;
        this.viewMediator = viewMediator;
        this.storage = storage;
    }

    run(){
        this.viewMediator.bindAddTodo(this.handlerAddTodo);
        this.viewMediator.bindDeleteTodo(this.handleDeleteTodo);
        this.viewMediator.bindUpdateTodo(this.handleUpdateTodo);
        this.viewMediator.bindSortDescending(this.handleSortDescending);
        this.viewMediator.bindUploadToStorage(this.handleUploadToStorage);
        this.viewMediator.bindGetFromStorage(this.handleGetFromStorage);

        this.viewMediator.openCreatePopup();
    }

    //redo to the syntax of run() method;
    // arrow functions should return value!!!

    handlerAddTodo = item => {
        this.viewMediator.reRenderList(this.todoListModel.create(item).currentState);
    }

    handleUpdateTodo = (id, item) => {
        this.viewMediator.reRenderList(this.todoListModel.update(id, item).currentState);
    }

    handleDeleteTodo = id => {
        this.viewMediator.reRenderList(this.todoListModel.delete(id).currentState);
    }

    handleSortDescending = () => {
        this.viewMediator.reRenderList(this.todoListModel.sortByDateDescending().currentState);
    }

    handleUploadToStorage = () => {
        this.storage.item = this.todoListModel.currentState;
    }

    handleGetFromStorage = () => {
        this.todoListModel.currentState = this.storage.item;
        this.viewMediator.reRenderList(this.todoListModel.currentState);
    }
}