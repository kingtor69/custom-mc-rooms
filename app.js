giftYes = $('#gift-yes')
giftRecipientDiv = $('#gift-recipient-div')
giftRecipientDiv.hide()


giftYes.on("click", function(e) {
    if (document.querySelector('#gift-yes').checked) {
        console.log('show it')
        giftRecipientDiv.show()
    } else {
        console.log('hide it')
        giftRecipientDiv.hide()
    };
});

$('form').on("submit", function(e) {
    e.preventDefault()
    // email info to us with confirmation email to them
});

$('#color').on("change", (e) => {
    $('#show-color').removeClass()
    $('#show-color').addClass(`${e.target.value} btn btn-block`)
});