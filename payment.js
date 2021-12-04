function parseCurrentQueryString() {
    const queryCurrent = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of queryCurrent) {
        queryObject[key] = value;
    };
    return queryObject;
};

function fillConfirmationDetails() {
    const queryObject = parseCurrentQueryString();
    queryObject.email = sessionStorage.email;
    for (let key in queryObject) {
        const span = $(`#data-${key}`);
        span[0].innerText = queryObject[key];
        if (key === "animal" || key === "template") {
            $(`#img-${key}`)
                .attr("src", `./images/${key}s/${queryObject[key]}.png`)
                .attr("alt", `${queryObject[key]}`)
                .show;
        };
    };
};

fillConfirmationDetails();


