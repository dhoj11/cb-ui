import axios from 'axios'

const obj = {

    addAuthHeader : function (authToken) {
        axios.defaults.headers.common = {'Authorization': `bearer ${authToken}`}
    },

    getURL: function (API, param) {
        let url = API;

        if (param !== undefined && param !== '') {
            for (let val in param) {
                if (!(param[val] === undefined || param[val] === null)) {
                    if (url.indexOf("?") > -1) {
                        url += '&';
                    } else {
                        url += '?';
                    }
                    url += val + '=' + param[val];
                }
            }
        }
        return url;
    }
}

export default {...axios, ...obj};