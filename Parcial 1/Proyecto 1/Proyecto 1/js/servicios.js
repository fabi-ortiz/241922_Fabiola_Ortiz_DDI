
const seccionParallax = document.querySelector(".parallax-servicio");

// Evento cuando se mueve el mouse
seccionParallax.addEventListener("mousemove", function(evento) {

    let posicionX = evento.offsetX;
    let posicionY = evento.offsetY;

    // se calcula el movimiento
    let movimientoX = (posicionX / 20);
    let movimientoY = (posicionY / 20);

    // Condición para evitar movimientos exagerados
    if (movimientoX < 50 && movimientoY < 50) {
        
        // Movemos el fondo ligeramente
        seccionParallax.style.backgroundPosition =
            movimientoX + "px " + movimientoY + "px";
    }

});
