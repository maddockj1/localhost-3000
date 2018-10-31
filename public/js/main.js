document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  getEvents()
  M.AutoInit();
})

// function clears parallax and repopulates
function buildAndBurnParallax (arr){
  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML = ""
  counter = 0
  populateParallax(arr)
}
// function populates parallax and reinitializes it
function populateParallax (arr){
  console.log("populateParallax")
  let templateHead = `<div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`

  let templateBody = `<div class="section white"><div class="row container"><h2 class="header pHeader">Event Title</h2><div class="row"><div class="col s12 m12 l12"><span>Description:</span><p class="grey-text text-darken-3 lighten-3 pdesc"></p></div></div><div class="row"><div class="col s5 m5 l5"><span>Date and Time:</span><input type="datetime-local" class="datepicker pDateTime" disabled></div><div class="col s6 m6 l6"><span>Platform:</span><br><p class="grey-text text-darken-3 lighten-3 pPlat"></p></div></div></div><div class="row container-wrapper"><div class="col s8 m8 l8"></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn pEdit"><i class="material-icons right">edit</i>Edit</a></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn pDelete"><i class="material-icons right">delete</i>Delete</a></div></div></div><div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML += templateHead
  for(let i = 0; i < arr.length; i++){
    parCont.innerHTML += templateBody
    counter++
  }
  initParallax()
}

function initParallax(){
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems);
}

function getEvents() {
  const contentArea = document.getElementById('parallax_container')
  let headers = document.getElementsByClassName('pHeader')
  let pDateTime = document.getElementsByClassName('pDateTime')
  let pdesc = document.getElementsByClassName('pdesc')
  let pPlat = document.getElementsByClassName('pPlat')
  axios.get('http://localhost:3000/events')
    .then((response) => {
      let { data } = response
      let platform = []
      buildAndBurnParallax(data)
      for (let i = 0; i < data.length; i++){
        axios.get(`http://localhost:3000/platforms/${data[i].platform_id}`)
        .then((response) => {
          pPlat[i].innerText = response.data.platform
        })
        console.log(platform)
        headers[i].innerText = data[i].eventName
        pDateTime[i].value = data[i].start.slice(0,16)
        pdesc[i].innerText = data[i].description
      }
    })
  }

// original getEvents()

  // function getEvents() {
  //   const contentArea = document.getElementById('parallax_container')
  //   axios.get('http://localhost:3000/events')
  //     .then((response) => {
  //       console.log(response);
  //       response.data.forEach((event) => {
  //
  //       let tbody = document.querySelector('#list-movies tbody')
  //       let tr = document.createElement('tr')
  //       let eventName = document.createElement('td')
  //       let description = document.createElement('td')
  //       let del_td = document.createElement('td')
  //       let deleteButton = document.createElement('button')
  //       let edit_td= document.createElement('td')
  //       let editButton = document.createElement('button')
  //
  //       eventName.innerText = event.eventName
  //       description.innerText = event.description
  //       deleteButton.innerText =  'Delete'
  //       editButton.innerText = `Edit`
  //
  //       deleteButton.setAttribute('data-id', event.id)
  //       deleteButton.setAttribute('host-id', event.host_id)
  //       deleteButton.setAttribute('class', 'waves-effect waves-light btn')
  //
  //       editButton.setAttribute('data-id', event.id)
  //       editButton.setAttribute('class', 'waves-effect waves-light btn')
  //
  //       deleteButton.addEventListener('click', (ev) => {
  //         let eventId = ev.target.getAttribute('data-id')
  //         // DELETE THIS RECORD!
  //         axios.delete(`/events/${eventId}`)
  //         .then((response) => {
  //           del_td.parentElement.remove()
  //         })
  //         .catch((err) => {
  //           //console.log(err)
  //         })
  //       })
  //
  //       //Append to page
  //       tr.appendChild(eventName)
  //       tr.appendChild(description)
  //       tr.appendChild(del_td)
  //       del_td.appendChild(deleteButton)
  //       tr.appendChild(edit_td)
  //       edit_td.appendChild(editButton)
  //       tbody.appendChild(tr)
  //
  //       })
  //     })
  //   }
// fill titles
// fill description
// fill datetime
// fill platform
// limit 10


// Materialize re-initialize functions
// Run each respective function to re-initialize any element that needs an initialization any time you change its content
