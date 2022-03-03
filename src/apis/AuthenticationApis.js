import axios from "../utils/axios"

export function getAccessToken() {
    const url = axios.getURL('https://api.chulbong.kr/access-token');
    return axios.get(url).then((response) => {
        response = response.data;
        return response;
    })
}