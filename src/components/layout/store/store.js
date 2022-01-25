import {action, observable, makeAutoObservable} from "mobx";

class store {
    constructor() {
        makeAutoObservable(this);
    }

    @observable viewType = null;

    @action
    setViewType = (type) => {
        this.viewType = type;
    }
}

export default store