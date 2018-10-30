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
