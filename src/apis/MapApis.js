import axios from "../utils/axios"

export function GetMapPositionsAll(){
    const url = axios.getURL('http://api.chulbong.kr:8080/positions');
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function GetMapPositionsOne(param){
    const url = axios.getURL('http://api.chulbong.kr:8080/positions/' + param.position_id);
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function getMapPositionsBoards(param){
    const url = axios.getURL('http://api.chulbong.kr:8080/positions/boards/' + param.position_id);
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function addMapPositions(param){
    const url = axios.getURL('http://api.chulbong.kr:8080/positions');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}

export function addMapComment(param){
    const url = axios.getURL('http://api.chulbong.kr:8080/positions/comment');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}

