const cuadro = document.getElementById("cuadro");

// EVENTO CLICK → cambia color
cuadro.addEventListener("click", () => {
  cuadro.style.backgroundColor = "lightblue";
  cuadro.textContent = "Click!";
});

// EVENTO MOUSEOVER → cambia tamaño
cuadro.addEventListener("mouseover", () => {
  cuadro.style.width = "200px";
  cuadro.style.height = "200px";
  cuadro.style.lineHeight = "200px";
});

// EVENTO MOUSEOUT → regresa al tamaño normal
cuadro.addEventListener("mouseout", () => {
  cuadro.style.width = "150px";
  cuadro.style.height = "150px";
  cuadro.style.lineHeight = "150px";
  cuadro.textContent = "Cuadro";
});

// EVENTO RESIZE → cambia texto al cambiar tamaño de ventana
window.addEventListener("resize", () => {
  cuadro.textContent = "Ventana cambiada";
});