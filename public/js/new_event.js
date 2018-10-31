console.log('Connected to new_event.js');
document.addEventListener('DOMContentLoaded', () => {
  handleFormSubmit()
})


function handleFormSubmit() {
  let form = document.getElementById('create-event')
  form.addEventListener('submit', (ev) => {
    console.log('Submitted');
    ev.preventDefault()
    console.log(('EVENT TARGET>>>', event.target.elements[0].name));
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (var i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if( inputName ) {
        postData[inputName] = formElements[i].value
      }
    }

    console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.post('http://localhost:3000/events', postData)
    .then((response) => {
      // document.getElementById("submit-form").disabled = true
      // let success = document.createElement('p')
      //     success.innerHTML = `Successfully added ${response.data[0].title}.<a href='events.html'>See all events.</a>`
      //     form.appendChild(success)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
