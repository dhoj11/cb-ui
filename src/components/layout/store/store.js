import {action, observable, makeAutoObservable} from "mobx";

class store {
    constructor() {
        makeAutoObservable(this);
    }


}

export default store