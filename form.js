$('form').on("submit", (e) => {
    sessionStorage.setItem('email', e.target.email.value);
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
    location.reload();
});