<<<<<<< HEAD
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

function getEvents() {
  const contentArea = document.getElementById('parallax_container')
  axios.get('http://localhost:3000/events')
    .then((response) => {
      response.data.forEach((event) => {

      let tbody = document.querySelector('#list-movies tbody')
      let tr = document.createElement('tr')
      let eventName = document.createElement('td')
      let description = document.createElement('td')
      let del_td = document.createElement('td')
      let deleteButton = document.createElement('button')
      let edit_td= document.createElement('td')
      let editButton = document.createElement('button')

      eventName.innerText = event.eventName
      description.innerText = event.description
      deleteButton.innerText =  'Delete'
      editButton.innerText = `Edit`

      deleteButton.setAttribute('data-id', event.id)
      deleteButton.setAttribute('class', 'waves-effect waves-light btn')

      editButton.setAttribute('data-id', event.id)
      editButton.setAttribute('class', 'waves-effect waves-light btn')

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
=======
/* TESTING VARIABLES */
let tmpArr = [{platform: `xbox360`, title: `C'mon over for a LAN party. BYOB. 18+`}, 2, 3, 4, 5, 6, 7, 8, 9, 10]
/* TESTING VARIABLES */

/* PLATFORMS */
// let platorms = {"PC":"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj-6YXjja_eAhVLJKwKHXYVBRUQjRx6BAgBEAU&url=https%3A%2F%2Fkathleenhalme.com%2Fexplore%2Fmac-clipart-blue-computer%2F&psig=AOvVaw3GqY9mQN6wPwkU_vo2-cqx&ust=1541021257158471","PlayStation":"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiS0pWLjq_eAhUBba0KHepaAK0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.playstation.com%2Fen-us%2Fexplore%2Fps4%2F&psig=AOvVaw33AVBQOQztzMh468AL5XuD&ust=1541021357281416","VR":""}

let counter = 0

document.addEventListener('DOMContentLoaded', function() {
  let body = document.getElementsByTagName('body')
  // body.addEventListener('onresize', defineConstraints())
  M.AutoInit();
  // NOTE: tmpArr is res data
  populateParallax(tmpArr)
})

function defineConstraints (){
  let headerImg = document.getElementById('movBackground')
  let headerBar = document.getElementById('headerBar')
  let height = headerBar.clientHeight
  let width = headerBar.clientWidth
  console.log(height, width)
  headerImg.height = height
  headerImg.width = width
}
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

  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML += `<div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
  for(let i = 0; i < arr.length; i++){
    parCont.innerHTML += `<div class="section white">
    <div class="row container"><h3 class="header pHeader">${arr[i].event}</h3><div class="row"><div class="col s3 m3 l3"><h6>Platform:</h6><span class="grey-text text-darken-3 lighten-3">${arr[i].platform}</span></div><div class="col s3 m3 l3"><h6>Date & Time:</h6><span class="grey-text text-darken-3 lighten-3">${arr[i].datetime}</span></div><div class="col s3 m3 l3"><h6>Description:</h6><span class="grey-text text-darken-3 lighten-3">${arr[i].description}</span></div></div></div><div class="row container"><div class="col s6 m6 l6"></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div></div></div><div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
    counter++
>>>>>>> frontEnd_skeletal
  }

// fill titles
// fill description
// fill datetime
// fill platform
// limit 10


// Materialize re-initialize functions
// Run each respective function to re-initialize any element that needs an initialization any time you change its content
