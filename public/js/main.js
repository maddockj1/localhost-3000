const platforms = {}
const toggle = 0

document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  M.AutoInit();
  getEvents()
  firstVisit()
  getPlatforms()
  popSel()

  let form = document.getElementById('form')
  form.addEventListener('onsubmit', function (e) {
    e.preventDefault()

  })
})

//first time visit
function firstVisit() {
  let dc = document.cookie
  let instance = M.Modal.getInstance(modal1)
  let btn = document.getElementById('loginProfile')
  if (!dc) {
    instance.open()
  } else {
    populateUserInf()
    btn.innerHTML = `<a href="#" data-target="slide-out" class="waves-effect waves-light btn sidenav-trigger"><i class="material-icons left">account_box</i>Profile</a>`
  }
}
// get and organize platforms
function getPlatforms() {
  axios.get(`http://localhost:3000/platforms/`)
    .then((response) => {
      let {
        data
      } = response
      data.forEach((element) => {
        if (!platforms[element.company]) {
          platforms[element.company] = [{
            id: element.id,
            platform: element.platform
          }]
        } else {
          platforms[element.company].push({
            id: element.id,
            platform: element.platform
          })
        }
      })
    })
}

// function clears parallax and repopulates
function buildAndBurnParallax(arr) {
  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML = ""
  populateParallax(arr)
}
// function populates parallax and reinitializes it
function populateParallax(arr) {
  let templateHead = `<div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`

  let templateBody = `<div class="section white"><div class="row container"><h2 class="header pHeader">Event Title</h2><div class="row"><div class="col s12 m12 l12"><span>Description:</span><p class="grey-text text-darken-3 lighten-3 pdesc"></p></div></div><div class="row"><div class="col s6 m6 l6"><span>Date and Time:</span><input id="datepicker" type="datetime-local" class="datepicker pDateTime" disabled></div><div class="col s6 m6 l6"><span>Platform:</span><br><p class="grey-text text-darken-3 lighten-3 pPlat"></p></div></div></div><div class="row container-wrapper"><div class="col s6 m6 l6"></div><div class="col s2 m2 l2 center-align"><a class="waves-effect waves-light btn pEdit"><i class="material-icons right">edit</i>Edit</a></div><div class="col s2 m2 l2 center-align"><a class="waves-effect waves-light btn pDelete"><i class="material-icons right">delete</i>Delete</a></div><div class="col s2 m2 l2 center-align"><a class="waves-effect waves-light btn pAttend"><i class="material-icons right">person_add</i>Attend</a></div></div></div><div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML += templateHead
  for (let i = 0; i < arr.length; i++) {
    parCont.innerHTML += templateBody
  }
  initParallax()
}

// materialize can be finicky about initialization. call these after dynamically populating them
function initParallax() {
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems);
}

function initCollapsible() {
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems);
}

function initSelect() {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems);
}

function getEvents() {
  const contentArea = document.getElementById('parallax_container')
  let headers = document.getElementsByClassName('pHeader')
  let pDateTime = document.getElementsByClassName('pDateTime')
  let pdesc = document.getElementsByClassName('pdesc')
  let pPlat = document.getElementsByClassName('pPlat')
  let pDelete = document.getElementsByClassName('pDelete')
  let pEdit = document.getElementsByClassName('pEdit')
  axios.get('http://localhost:3000/events')
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

              eventName.innerText = event.eventName
              description.innerText = event.description
              deleteButton.innerText = 'Delete'
              joinButton.innerText = `Join Bitch`

              deleteButton.setAttribute('data-id', event.id)
              deleteButton.setAttribute('host-id', event.host_id)
              deleteButton.setAttribute('class', 'waves-effect waves-light btn')

              joinButton.setAttribute('data-id', event.id)
              joinButton.setAttribute('class', 'waves-effect waves-light btn')
              joinButton.setAttribute('id', 'join')
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

              // populate user data
              function populateUserInf() {
                let user = parseJwt()
                let username = document.getElementById('username')
                axios.get(`http://localhost:3000/users/${user}`)
                  .then((response) => {
                    username.innerText = response.data[0].username
                  })
              }
              // Grab user id
              function parseJwt() {
                let token = document.cookie
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64)).id;
              };

              // logout (sorta)
              function logout() {
                document.cookie = 'token' + '=; Max-Age=-99999999;'
                window.location = ""; // TO REFRESH THE PAGE
              }

              // populate platform select
              function popSel() {

                let select = document.getElementById('platform_id')
                select.innerHTML = "<option disabled selected>Platform by Manufacturer</option>"
                for (let key in platforms) {
                  select.innerHTML += `<optgroup label="${key}" disabled>`
                  platforms[key].forEach((el) => {
                    select.innerHTML += `<option value="${el.id}">${el.platform}</option>`
                  })
                  select.innerHTML += `</optgroup>`
                }
                initSelect()
              }

              function popSel2(id) {
                if (id !== parseJwt()) {
                  return alert("You are not authorized to edit this")
                }
                document.getElementById("submit").addEventListener("click", function (event) {
                  event.preventDefault()
                  patchFormData()
                });
                let select = document.getElementById('platform_id')
                select.innerHTML = "<option disabled selected>Platform by Manufacturer</option>"
                for (let key in platforms) {
                  select.innerHTML += `<optgroup label="${key}" disabled>`
                  platforms[key].forEach((el) => {
                    select.innerHTML += `<option value="${el.id}">${el.platform}</option>`
                  })
                  select.innerHTML += `</optgroup>`
                }
                initSelect()
              }

              //new event submission
              function getFormData() {
                let data = {}
                let form = document.getElementById('form').children
                data['platform_id'] = document.getElementsByName('platform_id')[0].value
                document.getElementsByName('platform_id')[0].value = "Platform by Manufacturer"
                for (let i = 0; i < form.length; i++) {
                  if (form[i].tagName === 'INPUT') {
                    if (form[i].value !== "") {
                      data[form[i].getAttribute('name')] = form[i].value
                      form[i].value = ""
                    }
                  }
                }


                if (!data.eventName) {
                  alert("An Event Title is Required")
                  return
                } else if (!data.start) {
                  alert("A Start Time is Required")
                  return
                } else if (!data.end) {
                  alert("An End Time is Required")
                  return
                } else if (!data.platform_id) {
                  alert("A Platform is Required")
                  return
                }
                data.start = `${data.start}:00.000Z`
                data.end = `${data.end}:00.000Z`
                return data
              }

              //patch-fix
              function counter(num) {
                if (num === 0) {
                  num++
                  return true
                } else {
                  num = 0
                  return false
                }
              }

              function postFormData() {
                if (counter()) {} else {
                  return
                }
                let data = getFormData()
                axios.post(`http://localhost:3000/events/`, data)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    getEvents()
                  })
                toggleM2(false)
              }


              function patchFormData() {
                let data = getFormData()
                console.log('patch')
              }

              function delThisEntry(id) {
                axios.delete(`http://localhost:3000/events/${id}`)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    getEvents()
                  })

              }

              function toggleM2(bool) {
                if (bool !== true && bool !== false) {
                  alert("o.o what are you doing?")
                }
                let instance = M.Modal.getInstance(modal2);
                if (bool) {
                  instance.open()
                } else {
                  instance.close()
                }
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