/*
** this is being deployed manually with manual version management
** this code last updated 20211221-2245mst
*/

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
        const input = $(`#data-${key}`);
        input[0].value = formData[key];
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
