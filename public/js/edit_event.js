console.log('Connected to Edit_event.js');
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
    postData.end = `${postData.end}:00.000Z`
    postData.start = `${postData.start}:00.000Z`

    console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.put('/events/2', postData)
    .then((response) => {
      console.log(`response:`,response);
      // document.getElementById("submit-form").disabled = true
      // let success = document.createElement('p')
      //     success.innerHTML = `Successfully added ${response.data[0].title}.<a href='events.html'>See all events.</a>`
      //     form.appendChild(success)
    })
    .catch((error) => {
      console.log(`error happened`);
      console.log(error)
    })
  })
}
