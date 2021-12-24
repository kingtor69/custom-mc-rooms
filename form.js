/*
** this is being deployed manually with manual version management
** this code last updated 20211223-2257mst
*/

$('form').on("submit", (e) => {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        e.preventDefault();
        $('#recap-message')[0].innerText = "You must complete the recaptcha before you can proceed."
    }
    //  else {
    //     sessionStorage.setItem("recap", response);
    // }
    // let qString = "?";
    // for (const i in e.target) {
    //     const item = e.target[i];
    //     debugger;
    //     if (item in allKeys) {
    //         try {
    //             if (item === 'email') {
    //                 sessionStorage.setItem(item, e.target[item].value);
    //             } else {
    //                 qString += `${item}=${e.target[item].value}&`
    //             };
    //         } catch(e) {
    //             console.log(`${item} failed to convert to ${qString}`);
    //         };
    //     };
    // };
    // qString.slice(0,-1);
    // if(response.length === 0) {
    //     qString += "&recapped=false"
    //     window.location.replace(`./index.html${qString}#capchis`);

    // } else {
    //     window.location.replace(`./payment.html${qString}`);
    // };
});

$('#color').on("change", (e) => {
    $('#color').removeClass();
    if (e.target.value) {
        $('#color').addClass(`form-control ${e.target.value}`);
    } else {
        $('#color').addClass(`form-control text-muted`)
    }
    $('#show-color').removeClass();
    $('#show-color').addClass(`${e.target.value} btn btn-block`);
});

$('#clear-form').on('click', () => {
    sessionStorage.clear();
    window.location.replace('./index.html');
});

function prepopulateFormData(formData) {
    for (let datum in formData) {
        try {
            if (datum === "animal" || datum === "template") {
                $(`input.${datum}-inputs#${formData[datum]}`)[0].checked = true;
            } else if (datum === "color") {
                $(`#${formData[datum]}`)[0].selected = true;
            } else if (datum !=="g-recaptcha-response") {
                $(`#${datum}`)[0].value = formData[datum];
            };
        } catch (e) {
            console.log(`${datum}: ${formData[datum]}`);
            console.log(e);
        }
    };
};

function addRecaptchaReminder() {
    $('#recap-message').innerText = "Don't forget to complete the captcha."
}

const formData = parseCurrentQueryString();
prepopulateFormData(formData);
if ('recapped' in formData && !formData.recapped) {
    addRecaptchaReminder();
};