function parseCurrentQueryString() {
    const queryCurrent = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of queryCurrent) {
        queryObject[key] = value;
    };
    return queryObject;
};

function fillConfirmationDetails() {
    const formData = parseCurrentQueryString();
    formData.email = sessionStorage.email;
    for (let key in formData) {
        const span = $(`#data-${key}`);
        span[0].innerText = formData[key];
        if (key === "animal" || key === "template") {
            $(`#img-${key}`)
                .attr("src", `./images/${key}s/${formData[key]}.png`)
                .attr("alt", `${formData[key]}`)
                .show;
        };
    };
    $('#show-color').addClass(`${formData.color} btn btn-block`);
};

fillConfirmationDetails();
