/*
** this is being deployed manually with manual version management
** this code last updated 20211222-2224mst
*/

function parseCurrentQueryString() {
    const queryCurrent = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of queryCurrent) {
        queryObject[key] = value;
    };
    return queryObject;
};

function confirmEnoughData(formData) {
    const requiredKeys = ['template', 'color', 'message', 'email'];
    for (const key of requiredKeys) {
        if (!(key in formData)) {
            return false;
        };
    };
    return true;
}

function objectToQueryString(data) {
    let string = "?";
    for (const key in data) {
        string += `${key}=${data[key]}&`;
    };
    string = string.slice(0,-1);
    return string;
};

function confirmRecaptcha(data) {
    if (!("g-recaptcha-response" in data) || data["g-recaptcha-response"].length === 0) {
        alert('sorry, this page can not load without proper data');
        returnToIndex(data);
    } else {
        return;
    };
};

function fillConfirmationDetails() {
    const formData = parseCurrentQueryString();
    // confirmRecaptcha(formData);
    formData.email = sessionStorage.email;
    if (confirmEnoughData(formData)) {
        for (let key in formData) {
            if (key !== "g-recaptcha-response") {
                const span = $(`#data-${key}`);
                try {
                    span[0].innerText = formData[key];
                } catch (e) {
                    console.log(e);
;                }
                if (key === "animal" || key === "template") {
                    $(`#img-${key}`)
                        .attr("src", `./images/${key}s/${formData[key]}.png`)
                        .attr("alt", `${formData[key]}`)
                        .show;
                };
            };
        };
        $('#show-color').addClass(`${formData.color} btn btn-block`);
        $('#show-color').addClass(`${formData.color} btn btn-block`);
    } else {
        returnToIndex(formData);
    };
};

function returnToIndex(formData) {
    window.location.replace(`./index.html${objectToQueryString(formData)}`);
};

fillConfirmationDetails();