import Controller from './modules/Controller.js';
import Model from './modules/Model.js';
import ViewAgregator from './modules/ViewAgregator.js';
import BrowserView from './modules/BrowserView.js';
import ConsoleView from './modules/ConsoleView.js';
import Storage from './modules/Storage.js';

const todoList = [];
const containerForList = document.getElementById("list-content");

const controller = new Controller(new Model(todoList), new ViewAgregator([new BrowserView(containerForList), new ConsoleView()]), new Storage(localStorage));
controller.run()

// jest tests add to this todo list!!!
// test Storage, viewAgregator, model, finally test Agregator
// handle