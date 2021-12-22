export default {
    checkEmpty: function(data) {
        if (data === null) {
            return true;
        }
        if (data === undefined) {
            return true;
        }
        if (typeof data === 'string' && data.trim() === '') {
            return true;
        }
        if (typeof data === "object" && !Object.keys(data).length) {
            return true;
        }
        return false
    },
    checkBlank: function(str) {
        if (str === null) {
            return true;
        }
        if (str === undefined) {
            return true;
        }
        if (typeof str === 'string' && str.trim() === '') {
            return true;
        }
        let blank_pattern = /[\s]/g;
        if (blank_pattern.test(str) === true) {
            return true;
        }
        return false;
    },
    isEmpty : function(data) {
        if (data === null) return true;
        if (typeof data === 'undefined') return true;
        if (typeof data === 'string' && data === '') return true;
        if (Array.isArray(data) && data.length < 1) return true;
        if (typeof data === 'object' && data.constructor.name === 'Object' && Object.keys(data).length < 1 && Object.getOwnPropertyNames(data) < 1) return true;
        if (typeof data === 'object' && data.constructor.name === 'String' && Object.keys(data).length < 1) return true;
        return false;
    },
    isNumeric: function(num) {
        for (let i = 0; i < num.length; i++) {
            let temp = num.substr(i, 1);
            if (temp < "0" || temp > "9") {
                return false;
            }
        }
        return true;
    },
};