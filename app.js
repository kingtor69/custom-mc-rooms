
$('form').on("submit", (e) => {
    for (let field of e.target) {
        if (field.id !== "show-color") {
            sessionStorage.setItem(field.id, field.value)
        };
    };
});

$('#color').on("change", (e) => {
    $('#show-color').removeClass()
    $('#show-color').addClass(`${e.target.value} btn btn-block`)
});