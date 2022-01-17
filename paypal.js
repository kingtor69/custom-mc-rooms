/*
** this is being deployed manually with manual version management
** this code last updated 20220117-1443mst
*/

console.log(`paypal (sandbox)`);
let payment = '5.65';
// option will be added to add an additional donation

function verifyData() {
  // one more time for the people
  try {
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
      const order = {
        "purchase_units": [{
           "amount": {
             "currency_code": "USD",
             "value": payment,
             "breakdown": {
               "item_total": {  /* Required when including the `items` array */
                 "currency_code": "USD",
                 "value": value
               }
             }
           },
           "items": [
             {
               "name": "Custom Minecraft Experience", 
               "description": "Customized minecraft space for Mac or PC version of Minecraft.",
               "custom_id": JSON.stringify(orderData),
               "unit_amount": {
                 "currency_code": "USD",
                 "value": "5.65"
               },
               "quantity": "1"
             }
           ]
         }]
      }
    
      if (payment > 5.65) {
        order.items.append(
          {
            "name": "Additional donation",
            "description": "THANK YOU!!!",
            "unit_amount": {
              "currency_code": "USD",
              "value": `${payment-5.65}`
            },
            "quantity": "1"
          }
        )
      }
    
      return actions.order.create(order);
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
  $('#paypal-button-container')[0].innerHTML = "Sorry, there's something wrong with the form data. Please <a href='./index.html'>try again</a>. If you keep getting this message, we're probably aware of the issue, so please come back soon and try again.";
} else {
  insufficientData();
};

