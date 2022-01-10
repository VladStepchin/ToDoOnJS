import Agregator from './modules/Agregator.js';
import Model from './modules/Model.js';
import ViewMediator from './modules/ViewMediator.js';
import BrowserView from './modules/BrowserView.js';
import ConsoleView from './modules/ConsoleView.js';
import Storage from './modules/Storage.js';

const todoList = [];
const containerForList = document.getElementById("list-content");

const agregator = new Agregator(new Model(todoList),
                  new ViewMediator([new BrowserView(containerForList), new ConsoleView()]),
                  new Storage(localStorage));
agregator.run();


// jest tests add to this todo list!!!
// test Storage, viewAgregator, model, finally test Agregator
// handle