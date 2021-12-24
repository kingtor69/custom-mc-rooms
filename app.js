/*
** this is being deployed manually with manual version management
** this code last updated 20211223-2257mst
*/

const requiredKeys = ['template', 'color', 'message', 'email'];
const allKeys = [...requiredKeys, 'animal', 'recipient']

function parseCurrentQueryString() {
    const queryCurrent = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of queryCurrent) {
        queryObject[key] = value;
    };
    return queryObject;
};

