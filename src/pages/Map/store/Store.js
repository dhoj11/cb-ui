import {action, observable, makeAutoObservable} from "mobx";

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    @observable map = null;                         // 카카오맵 객체
    @observable clusterer = null;
    @observable searchedLocation = null;
    @observable searchedLocationName = "";
    @observable latitude = 37.56690530047888;
    @observable longitude = 126.97869751195513;
    @observable positions = [];
    @observable snackbarOpen = false;
    @observable snackBarMsg = null;


    @action setSearchedLocation = (location) => {
        this.searchedLocation = location;
    }

    @action setSearchedLocationName = (name) => {
        this.searchedLocationName = name;
    }

    @action setLatLon = (lat, lon) => {
        this.latitude = lat;
        this.longitude = lon;
    }

    @action setLatitude = (value) => {
        this.latitude = value;
    }

    @action setLongitude = (value) => {
        this.longitude = value;
    }

    @action setPositions = (list) => {
        this.positions = list;
    }

    @action setMap = (obj) => {
        this.map = obj;
        // this.map.setMaxLevel(10);
    }

    @action setClusterer = (obj) => {
        this.clusterer = obj;
    }

    @action setSnackBarOpen = (value) => {
        this.snackbarOpen = value;
    }

    @action setSnackBarMsg = (msg) => {
        this.snackBarMsg = msg;
    }
}

export default new Store();