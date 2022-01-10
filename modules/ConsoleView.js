export default class ConsoleView {
    constructor() {
    }

    openCreatePopup() {
        console.log('The popup has been opened')
    }

    reRenderList() {
        console.log('The list have been re-rendered')
    }

    bindAddTodo() {
        console.log('The new item has been added')
    }

    bindDeleteTodo() {
        console.log('The item has been removed')
    }

    bindUpdateTodo() {
        console.log('The item has been updated')
    }

    bindSortDescending() {
        console.log('The items have been sorted')
    }

    bindUploadToStorage() {
        console.log('The items have been uploaded to storage')
    }

    bindGetFromStorage() {
        console.log('New items have been taken from storage')
    }
}