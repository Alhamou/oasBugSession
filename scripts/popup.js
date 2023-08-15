
// document.addEventListener("DOMContentLoaded", init);
$(document).ready(init)

function init(){

     document.getElementById("date").textContent = new Date();

     const but = document.getElementById("myButton")

     but.addEventListener("click", function(e){
         console.log("i am here :)")
     })
}
