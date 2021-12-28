/*
** this is being deployed manually with manual version management
** this code last updated 20211225-2241mst
*/
console.log('payment');


function confirmEnoughData(data) {
    for (const key of requiredKeys) {
        if (!(key in data)) {
            return false;
        };
    };
    return true;
};

function fillConfirmationDetails(data) {
    if (!confirmRecaptcha(data)) {
        insufficientData(data);
    };
    data.email = sessionStorage.email;
    if (confirmEnoughData(data)) {
        for (let key in data) {
            if (key !== "g-recaptcha-response") {
                const span = $(`#data-${key}`);
                try {
                    span[0].innerText = data[key];
                } catch (e) {
                    console.log(e);
;                }
                if (key === "animal" || key === "template") {
                    $(`#img-${key}`)
                        .attr("src", `./images/${key}s/${data[key]}.png`)
                        .attr("alt", `${data[key]}`)
                        .show;
                };
            };
        };
        $('#show-color').addClass(`${data.color} btn btn-block`);
        $('#show-color').addClass(`${data.color} btn btn-block`);
    } else {
        insufficientData(data);
    };
};

function insufficientData(data) {
    const msec = 5000;
    let sec = msec/1000;
    $('#header').html(`Sorry, there is insufficient data to load this page. You will be redirected in <span id="seconds-span">${sec}</span> seconds.`);
    setInterval(() => {
        sec --;
        if (sec > 0) {
            $('#seconds-span')[0].innerText = sec;
        };
    }, 1000);
    setTimeout(() => {
        window.location.replace(`./index.html${objectToQueryString(data)}`);
    }, msec);
};

const formData = parseCurrentQueryString();

fillConfirmationDetails(formData);

$('#paypal-form').on('submit', () => {
    sessionStorage.setItem('room', formData);
});
