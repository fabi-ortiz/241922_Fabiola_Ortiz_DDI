 const titulo = document.querySelector("#titulo");
const simba = document.querySelector("#simba");
const nubes = document.querySelector("#nubes");

window.addEventListener("scroll", (event)=>{
 titulo.style.right = window.scrollY * 3 + "px";
 //simba.style.bottom = window.scrollY * 2 + "px";
  simba.style.right = window.scrollY * 2 + "px";
  nubes.style.right = window.scrollY * 2 + "px";

})