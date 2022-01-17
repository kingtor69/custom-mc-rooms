/*
** this is being deployed manually with manual version management
** this code last updated 20211225-2241mst
*/
console.log('app');

const requiredKeys = ['template', 'color', 'message', 'name', 'email'];
const allKeys = [...requiredKeys, 'animal', 'recipient']

function parseCurrentQueryString() {
    const queryCurrent = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of queryCurrent) {
        queryObject[key] = value;
    };
    return queryObject;
};

function objectToQueryString(data) {
    let string = "?";
    for (const key in data) {
        string += `${key}=${data[key]}&`;
    };
    string = string.slice(0,-1);
    return string;
};

function confirmRecaptcha(data) {
    try {
        if (data['g-recaptcha-response'] === sessionStorage['g-recaptcha-response']) {
            return true;
        } else {
            return false;
        };
    } catch (e) {
        console.log(e);
        return false;
    };
};
