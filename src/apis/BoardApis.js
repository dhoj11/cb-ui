import axios from "../utils/axios"

export function addBoard(param) {
    const url = axios.getURL('https://api.chulbong.kr/board');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}