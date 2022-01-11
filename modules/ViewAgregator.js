export default class ViewAgregator {    
    // make correct Agregator without binding to DOM logic
    // add 3 parameter for Console

    constructor(viewsArray) {
        this.viewsArray = viewsArray;
    }

    execute(fnName, args){
        this.viewsArray.forEach(item => item[fnName](args));
    }
}