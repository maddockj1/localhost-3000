
document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  getEvents()
  handleCreateForm()
  handleEditForm()
  document.getElementById('new-btn').addEventListener('click', handleNewButton)

const createForm = document.getElementById('create-form')
const editForm = document.getElementById('edit-form')
const table = document.getElementById('table')

function handleNewButton (event) {
  editForm.style.display = 'none'
  table.style.display = 'none'
  createForm.style.display = 'block'
}


function handleEditForm() {
  let form = document.getElementById('edit-event')
  form.addEventListener('submit', (ev) => {
    console.log('Submitted');
    console.log(('EVENT TARGET>>>', event.target.elements[0].name));
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements
    let id = parseInt(document.getElementById('whatever').value)
    console.log('ID IS>>>>>', id);
    debugger
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
    axios.put(`/events/${id}`, postData)
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


function handleCreateForm() {
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
    axios.post('/events', postData)
    .then((response) => {
      response.redirect('')
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

function getEvents() {
  const contentArea = document.getElementById('table')
  axios.get('/events')
    .then((response) => {
      response.data.forEach((event) => {

        let tbody = document.querySelector('#list-events tbody')
        let tr = document.createElement('tr')
        let eventName = document.createElement('td')
        let description = document.createElement('td')
        let del_td = document.createElement('td')
        let deleteButton = document.createElement('button')
        let join_td = document.createElement('td')
        let joinButton = document.createElement('button')
        let edit_td = document.createElement('td')
        let editButton = document.createElement('button')

        eventName.innerText = event.eventName
        description.innerText = event.description
        deleteButton.innerText = 'Delete'
        joinButton.innerText = `Join`
        editButton.innerText = `Edit`

        deleteButton.setAttribute('data-id', event.id)
        deleteButton.setAttribute('host-id', event.host_id)
        deleteButton.setAttribute('class', 'waves-effect waves-light btn')

        joinButton.setAttribute('data-id', event.id)
        joinButton.setAttribute('class', 'waves-effect waves-light btn')
        joinButton.setAttribute('id', 'join')

        editButton.setAttribute('data-id', event.id)
        editButton.setAttribute('class', 'waves-effect waves-light btn')
        editButton.setAttribute('id', 'edit')
        //console.log(response.data);
        deleteButton.addEventListener('click', (ev) => {
          let eventId = ev.target.getAttribute('data-id')
          // DELETE THIS RECORD!
          axios.delete(`/events/${eventId}`)
            .then((response) => {
              del_td.parentElement.remove()
            })
            .catch((err) => {
              //console.log(err)
            })
        })

        editButton.addEventListener('click', (event) => {
          // editForm.reset()
          document.getElementById('whatever').value = event.target.getAttribute('data-id')
          editForm.style.display = 'block'
          table.style.display = 'none'
          createForm.style.display = 'none'
        })

        joinButton.addEventListener('click', (ev) => {
          let eventId = ev.target.getAttribute('data-id')
          console.log(eventId);
          axios.post(`/user_events/${eventId}`)
            .then((response) => {
              console.log(response)
            })
            .catch((err) => {
              console.log(err)
            })
        })


        //Append to page
        tr.appendChild(eventName)
        tr.appendChild(description)
        tr.appendChild(del_td)
        del_td.appendChild(deleteButton)
        tr.appendChild(join_td)
        join_td.appendChild(joinButton)
        tr.appendChild(edit_td)
        edit_td.appendChild(editButton)
        tbody.appendChild(tr)


      })
    })

}
})
