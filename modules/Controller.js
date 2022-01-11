export default class Controller {
    constructor(todoListModel, viewAgregator, storage) {
        this.todoListModel = todoListModel;
        this.viewAgregator = viewAgregator;
        this.storage = storage;
    }

    run(){
        this.viewAgregator.execute("bindAddTodo", this.handlerAddTodo.bind(this));
        this.viewAgregator.execute("bindDeleteTodo", this.handleDeleteTodo.bind(this));
        this.viewAgregator.execute("bindUpdateTodo", this.handleUpdateTodo.bind(this));
        this.viewAgregator.execute("bindSortDescending", this.handleSortDescending.bind(this));
        this.viewAgregator.execute("bindUploadToStorage", this.handleUploadToStorage.bind(this));
        this.viewAgregator.execute("bindGetFromStorage", this.handleGetFromStorage.bind(this));

        this.viewAgregator.execute("openCreatePopup", null);
    }

    handlerAddTodo(item) {  
        this.viewAgregator.execute("reRenderList", this.todoListModel.create(item).currentState);
    }

    handleUpdateTodo(id, item){
        this.viewAgregator.execute("reRenderList", this.todoListModel.update(id, item).currentState);
    }

    handleDeleteTodo(id){
        this.viewAgregator.execute("reRenderList", this.todoListModel.delete(id).currentState);
    }

    handleSortDescending(){
        this.viewAgregator.execute("reRenderList", this.todoListModel.sortByDateDescending().currentState);
    }

    handleUploadToStorage(){
        this.storage.item = this.todoListModel.currentState;
    }

    handleGetFromStorage(){
        this.todoListModel.currentState = this.storage.item;
        this.viewAgregator.execute("reRenderList", this.todoListModel.currentState);
    }
}
