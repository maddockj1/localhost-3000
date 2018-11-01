document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  getEvents()


})

function getEvents() {
  const contentArea = document.getElementById('parallax_container')
  axios.get('/events')
    .then((response) => {
      response.data.forEach((event) => {

        let tbody = document.querySelector('#list-movies tbody')
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
        tbody.appendChild(tr)


      })
    })

}
