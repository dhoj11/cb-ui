import axios from "../utils/axios"

export function getAccessToken() {
    const url = axios.getURL('http://192.168.31.197:8080/access-token');
    return axios.get(url).then((response) => {
        response = response.data;
        axios.addAuthHeader(response);
    })
}