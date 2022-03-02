import axios from "../utils/axios"

//http://192.168.31.197:8080/notice

export function getNoticeAll() {
    const url = axios.getURL('https://api.chulbong.kr/notice');
    return axios.get(url).then((response) => {
        response = response.data;
        return response
    })
}

export function getNoticeOne(param) {
    const url = axios.getURL('https://api.chulbong.kr/notice/' + param.notice_no);
    return axios.get(url).then((response) => {
        response = response.data;
        return response
    })
}

export function getNoticeRecent(param) {
    const url = axios.getURL('https://api.chulbong.kr/recent-notice');
    return axios.get(url).then((response) => {
        response = response.data;
        return response
    })
}