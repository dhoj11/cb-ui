import axios from "../utils/axios"

/*local
http://192.168.31.197:8080/
 */

export function GetMapPositionsAll(){
    const url = axios.getURL('https://api.chulbong.kr/positions');
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function GetMapPositionsOne(param){
    const url = axios.getURL('https://api.chulbong.kr/positions/' + param.position_id);
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function getMapPositionsBoards(param){
    const url = axios.getURL('https://api.chulbong.kr/positions/boards/' + param.position_id);
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}

export function addMapPosition(param){
    const url = axios.getURL('https://api.chulbong.kr/positions');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}

export function addMapComment(param){
    const url = axios.getURL('https://api.chulbong.kr/positions/comment');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}

