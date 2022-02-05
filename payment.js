/*
** this is being deployed manually with manual version management
** this code last updated 20220205-1310mst
*/
console.log('payment');
let formDataAdded = false;

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
        data.failLocation = "payment.js line 18"
        insufficientData(data);
    };
    data.email = sessionStorage.email;
    if (confirmEnoughData(data)) {
        for (let key in data) {
            if (key !== "g-recaptcha-response" && key !=="devmode") {
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
        return data;
    } else {
        data.failLocation="payment.js line 42"
        insufficientData(data);
    };
};

function insufficientData(data) {
  if ('devmode' in data && data.devmode === "true") {
    if (!('failLocation' in data)) {
        data.failLocation = "unspecified";
    };
    $('#header').text(`devmode = ${data.devmode}, failed at ${data.failLocation}`);
  } else {
    const msec = 5000;
    let sec = msec/1000;
    $('#header').html(`Sorry, there is insufficient data to load this page. You will be redirected in <span id="seconds-span">${sec}</span> seconds.`);
    const stopButton=$('button').text('cancel redirect').addClass('btn-warning');
    $('#header-div').append(stopButton);
    const countdown = setInterval(() => {
      sec --;
      if (sec >= 0) {
          $('#seconds-span')[0].innerText = sec;
      };
      console.log(`interval ${sec} seconds`);
    }, 1000);
    const timeout = setTimeout(() => {
      redirect(data);
    }, msec);
    stopButton.click(() => {
      if (stopButton.text() === "cancel redirect") {
        clearInterval(countdown);
        clearTimeout(timeout);
        stopButton.text('redirect now').removeClass('btn-warning').addClass('btn-outline-primary');
      } else if (stopButton.text() === "redirect now") {
        redirect(data);
      };
    });
  };
};

function redirect(data) {
  window.location.replace(`./index.html${objectToQueryString(data)}`)
};

function addFormData(data) {
  $('#form-data-input')[0].value = JSON.stringify(data);

  if ($('#form-data-input')[0].value) {
    return true;
  } else {
    return false;
  }
};

const formData = parseCurrentQueryString();
if ('devmode' in formData && formData.devmode === "true") {
  sessionStorage.clear();
  sessionStorage.setItem('email', 'kingtor@gmail.com');
  sessionStorage.setItem('g-recaptcha-response', 'dummy');
};
const orderData = fillConfirmationDetails(formData);

function formatApiRequest(orderData, orderDetails) {
  const importantOrderDetails = {};
  for (let key of allKeys) {
    if (key in orderDetails) {
      importantOrderDetails[key] = orderDetails[key];
    } else if (requiredKeys.includes(key)) {
      importantOrderDetails[key] = `Something went wrong and required information is missing. Better email ${orderData.payer.email} to ask. And tell Dad. This shouldn't happen. :(`
    };
  };
  if ("devmode" in orderDetails) {
    importantOrderDetails.devmode = orderDetails.devmode;
  };
  return {
    payment_confirmation: {
      id: orderData.id,
      payer: {
        name: `${orderData.payer.given_name} ${orderData.payer.surname}`
      }
    },
    form_data: importantOrderDetails
  };
};

async function sendConfirmationEmail(req) {
  console.log(req);
  const url = 'https://tree-sentience.com/api/mc/confirmation';
  const resp = await axios.post(url, { params: req });
  if ('email' in resp.data) {
    return;
  } else if ('errors' in resp.data) {
    throw new Error(resp.data.errors);
  };
  if ('errors' in conf) {
    throw new Error(conf.errors);
  } else if (!('email' in conf)) {
    console.log(conf);
    $('#paypal-button-container')[0].innerHTML = '';
    $('#confirmation-container')[0].innerHTML = `
      <hr>
      <h2>Thank you for your donation!</h2>
      <h4>Your email has been sent to our minecraft builder. We will respond within 7 days of payment confirmation.</h4>
      <p>(Sometimes payments can take 1-3 business days if PayPal is taking funds from your bank account.)</p>
    `;
  } else {
    throw new Error('no error, no email?');
  };

};
