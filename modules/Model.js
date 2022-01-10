export default class Model {
    constructor(todoList) {
        this.todoList = todoList;
    }
    // переробити на Set не вдастся бо при отриманні значень з DOM ми скоріше за все створюємо інший об'єкт,
    // а порівняння відбувається по посиланню а не по значенню

    get currentState() {
        return this.todoList;
    }

    set currentState(newList) {
        this.todoList = [...newList];
    }

    create(item) {
        this.todoList.push(item)
        return this;
    }

    update(itemId, newValue) {
        const itemToUpdate = this.todoList.find(item => item.ID === itemId)
        itemToUpdate.content = newValue;
        return this;
    }

    delete(itemId) {
        this.todoList = this.todoList.filter(item => item.ID !== itemId);
        return this;
    }

    sortByDateDescending() {
        this.todoList.sort((a, b) => b.ID - a.ID)
        return this;
    }
}