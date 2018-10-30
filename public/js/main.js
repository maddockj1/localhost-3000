/* TESTING VARIABLES */
let tmpArr = [{platform: `xbox360`, title: `C'mon over for a LAN party. BYOB. 18+`}, 2, 3, 4, 5, 6, 7, 8, 9, 10]
/* TESTING VARIABLES */

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
  let templateHead = `<div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`

  let templateBody = `<div class="section white"><div class="row container"><h3 class="header pHeader">Event Title</h3><h6>Platform:</h6><span class="grey-text text-darken-3 lighten-3 pPlat">Platform</span><h6>Date & Time:</h6><span class="grey-text text-darken-3 lighten-3 pDateTime">datetime placeholder</span><h6>Description:</h6><span class="grey-text text-darken-3 lighten-3 pdesc">C'mon over for a LAN party. BYOB. 18+</span></div><div class="row container"><div class="col s6 m6 l6"></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div><div class="col s2 m2 l2"><a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a></div> </div></div><div class="parallax-container"><div class="parallax"><img src="https://g.foolcdn.com/editorial/images/453677/mans-hands-holding-a-video-game-controller.jpg"></div></div>`
  let parCont = document.getElementById('parallax_container')
  parCont.innerHTML += templateHead
  for(let i = 0; i < arr.length; i++){
    parCont.innerHTML += templateBody
    counter++
  }
  initParallax()
}
// fill titles
// fill description
// fill datetime
// fill platform
// limit 10


// Materialize re-initialize functions
// Run each respective function to re-initialize any element that needs an initialization any time you change its content
function initParallax () {
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems);
}
