document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js')
  getEvents()


})

// /* TESTING VARIABLES */
// let tmpArr = [1,2,3,4,5,6,7,8,9,10]
// /* TESTING VARIABLES */
//
// let counter = 0
//
// document.addEventListener('DOMContentLoaded', function() {
//   let body = document.getElementsByTagName('body')
//   // body.addEventListener('onresize', defineConstraints())
//   M.AutoInit();
//   // NOTE: tmpArr is res data
//   populateParallax(tmpArr)
// })
//
// function defineConstraints (){
//   let headerImg = document.getElementById('movBackground')
//   let headerBar = document.getElementById('headerBar')
//   let height = headerBar.clientHeight
//   let width = headerBar.clientWidth
//   console.log(height, width)
//   headerImg.height = height
//   headerImg.width = width
// }
// // function clears parallax and repopulates
// function buildAndBurnParallax (arr){
//   let parCont = document.getElementById('parallax_container')
//   parCont.innerHTML = ""
//   counter = 0
//   populateParallax(arr)
// }
// // function populates parallax and reinitializes it
// // function populateParallax (arr){
// //   console.log("populateParallax")
// //   let templateHead = `<div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
// //
// //   let templateBody = `<div class="section white"><div class="row container"><h2 class="header pHeader">Event Title</h2><p class="grey-text text-darken-3 lighten-3 pPlat">Platform</p><p class="grey-text text-darken-3 lighten-3 pDateTime">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>    <br><p class="grey-text text-darken-3 lighten-3 pdesc">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p></div><div class="row container"><div class="col s10 m10 l10"></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div> </div></div><div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
// //   let parCont = document.getElementById('parallax_container')
// //   parCont.innerHTML += templateHead
// //   for(let i = 0; i < arr.length; i++){
// //     parCont.innerHTML += templateBody
// //     counter++
// //   }
// //   initParallax()
// // }
//delete this if the other works
// function joinEvent() {
//   let editButton = document.getElementById('join')
//   //console.log(editButton)
//   editButton.addEventListener('click', (ev) => {
//     let eventId = ev.target.getAttribute('data-id')
//     console.log(eventId)
//     axios.post(`user_events/${eventId}`)
//       .then((response) => {
//         console.log(response)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
// }
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
        let edit_td = document.createElement('td')
        let editButton = document.createElement('button')

        eventName.innerText = event.eventName
        description.innerText = event.description
        deleteButton.innerText = 'Delete'
        editButton.innerText = `Join Bitch`

        deleteButton.setAttribute('data-id', event.id)
        deleteButton.setAttribute('host-id', event.host_id)
        deleteButton.setAttribute('class', 'waves-effect waves-light btn')

        editButton.setAttribute('data-id', event.id)
        editButton.setAttribute('class', 'waves-effect waves-light btn')
        editButton.setAttribute('id', 'join')
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
        editButton.addEventListener('click', (ev) => {
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
        tr.appendChild(edit_td)
        edit_td.appendChild(editButton)
        tbody.appendChild(tr)


      })
    })

}

// fill titles
// fill description
// fill datetime
// fill platform
// limit 10


// Materialize re-initialize functions
// Run each respective function to re-initialize any element that needs an initialization any time you change its content