import axios from "../utils/axios"

export function addBoard(param) {
    const url = axios.getURL('http://localhost:8080/board');
    return axios.post(url, param).then((response) => {
        response = response.data;
        return response
    })
}