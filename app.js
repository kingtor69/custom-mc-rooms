for (let field of $('form')) {
    console.log(field)
}

$('form').on("submit", (e) => {
    for (let field of e.target) {
        if (field.id !== "show-color") {
            sessionStorage.setItem(field.id, field.value);
        };
    };
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

for (let key in sessionStorage) {
    $(`#data-${key}`).text(sessionStorage[key]);
};

$('#clear-form').on('click', () => {
    sessionStorage.clear();
    location.reload();
});