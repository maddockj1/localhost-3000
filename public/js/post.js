function newEvent(){
//whatever the id is add it to this
let form = document.getElementById('newEventData')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  //grab all the form values
  let postData={}
  let formElements = ev.target.elements
  for(let i=0; i<formElements.length; i++){
    let inputName = formElements[i].name
    if (inputName) {
      postData[inputName] = forElements[i].value
    }
    console.log('postData', postData)
  }
})
axios.post('/events', postData)
.then((response)=>{
  console.log(response)
  //uses josh get function
})
.catch((err)=>{
  console.log(err)
}
}
