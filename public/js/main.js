document.addEventListener('DOMContentLoaded', function() {
  let body = document.getElementsByTagName('body')
  // body.addEventListener('onresize', defineConstraints())
  M.AutoInit();
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

function populateParallex (){
  let parCont = document.getElementById('id')
  initParallax()
}


// Materialize re-initialize functions
// Run each respective function to re-initialize any element that needs an initialization any time you change its content
function initParallax () {
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems, options);
}
