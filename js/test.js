
const start = (param) => {
  $('#theeModal').modal('show');
  document.getElementById(`ProductName`).setAttribute('value', param);

}


async function placeOrder() {

  try {
    // post body data 
    const newMessage = {
      sender_name: document.getElementById(`userName`).value,
      sender_email: document.getElementById(`userEmail`).value,
      sender_phone_number: document.getElementById(`userPhone`).value,
      sender_location: document.getElementById(`userLocation`).value,
      sender_order: document.getElementById(`ProductName`).value,
      sender_order_qnty: document.getElementById(`ProductQnty`).value
    };

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // PRODUCTION
    // const response = await fetch(`https://janamas-email-api.onrender.com/api/send-email`, options);

    // TEST
    const response = await fetch('http://localhost:3400/api/send-email', options);

    console.log(response);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        document.getElementById("placeOrder").reset();
        appendAlert(data.message, 'success')

      } else {

        appendAlert(data.message, 'error')

      }

    }

  }

  catch (error) {

    console.log(error);

    return error;
  }

}





const newBreedForm = document.forms.namedItem("placeOrder");
newBreedForm.addEventListener("submit", (event) => {
  placeOrder();
  event.preventDefault();

}, false);


const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
