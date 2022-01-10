export default class Storage {
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