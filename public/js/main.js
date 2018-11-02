document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  getEvents()
  handleCreateForm()
  handleEditForm()
  document.getElementById('new-btn').addEventListener('click', handleNewButton)

  const createForm = document.getElementById('create-form')
  const editForm = document.getElementById('edit-form')
  const table = document.getElementById('table')

  function handleNewButton(event) {
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
        if (inputName) {
          postData[inputName] = formElements[i].value
        }
      }
      postData.end = `${postData.end}:00.000Z`
      postData.start = `${postData.start}:00.000Z`

      console.log('postData', postData);
      // axios.post that data to the correct backend route
      axios.put(`/events/${id}`, postData)
        .then((response) => {
          console.log(`response:`, response);
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
        if (inputName) {
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
          console.log(`response:`, response);
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
          console.log('EVENT', event);
          let eventsContainer = document.getElementById('events-container')
            eventsContainer.innerHTML += `
            <div class="card" data-id="${event.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://i.amz.mshcdn.com/jxBPyLb8vZBPR3UAm5cRh8DjzUI=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784268%2F308999a4-c58d-4758-b71d-8303f276af7a.jpeg">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${event.eventName}  ${event.start}<i class="material-icons right">more_vert</i></span>
                <p><a>${event.description}</a></p>
              </div>
              <div class="card-action">

                <button type="button" class="btn btn-default" id='delete' data-id="${event.id}" host-id="${event.host_id}">Delete</button>


                </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Event Details<i class="material-icons right">close</i></span>
                <h5>City:</h5>
                <p>${event.city} ${event.zip}</p>
                <h5>Address:</h5>
                <p>${event.address}</p>
                <h5>Date:</h5>
                <p>${event.start}</p>
              </div>
            </div>
        `


          let deleteButton = document.getElementById('delete')
          let joinButton = document.getElementById('join')
          let editButton = document.getElementById('edit')



          // deleteButton.setAttribute('data-id', event.id)
          // deleteButton.setAttribute('host-id', event.host_id)
          // deleteButton.setAttribute('class', 'waves-effect waves-light btn')
          //
          // joinButton.setAttribute('data-id', event.id)
          // joinButton.setAttribute('class', 'waves-effect waves-light btn')
          // joinButton.setAttribute('id', 'join')
          //
          // editButton.setAttribute('data-id', event.id)
          // editButton.setAttribute('class', 'waves-effect waves-light btn')
          // editButton.setAttribute('id', 'edit')
          // //console.log(response.data);
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
          //
          // editButton.addEventListener('click', (event) => {
          //   // editForm.reset()
          //   document.getElementById('whatever').value = event.target.getAttribute('data-id')
          //   editForm.style.display = 'block'
          //   table.style.display = 'none'
          //   createForm.style.display = 'none'
          // })
          //
          // joinButton.addEventListener('click', (ev) => {
          //   let eventId = ev.target.getAttribute('data-id')
          //   console.log(eventId);
          //   axios.post(`/user_events/${eventId}`)
          //     .then((response) => {
          //       console.log(response)
          //     })
          //     .catch((err) => {
          //       console.log(err)
          //     })
          // })

        })
      })

  }
})
