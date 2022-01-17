/*
** this is being deployed manually with manual version management
** this code last updated 202201-2036mst
*/

const sandbox = true
console.log(`paypal (${sandbox ? "sandbox" : "live"})`);
let payment = '5.65';
// option will be added to add an additional donation

function verifyData() {
  // one more time for the people
  try {
    const requiredKeys = ['template', 'color', 'message', 'name', 'email'];
    for (let key of requiredKeys) {
      if (!(key in orderData)) {
        return false;
      };
    };
    return true;
  } catch (e) {
    return false;
  }
};

paypal.Buttons({

    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: payment
          }
        }]
      });
    },

    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal-button-container');

if (!verifyData()) {
  $('#paypal-button-container')[0].innerHTML = "Sorry, there's something wrong with the form data. Please <a href='./index.html'>try again</a>";
};