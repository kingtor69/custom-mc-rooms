$('form').on("submit", (e) => {
    for (let field of e.target) {
        if (field.class === "field-store") {
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

$('.template-inputs').on("change", (e) => {
    sessionStorage.setItem('template', e.currentTarget.id);
});

$('.animal-inputs').on("change", (e) => {
    sessionStorage.setItem('animal', e.currentTarget.id);
});

for (let key in sessionStorage) {
    $(`#data-${key}`).text(sessionStorage[key]);
};

$('#clear-form').on('click', () => {
    sessionStorage.clear();
    location.reload();
});