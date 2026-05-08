
import {
    Cuadrado,
    Linea,
    Sticker,
    Circulo,
    Estrella
} from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

const elementos = [];

let historial = [];
let rehacerHistorial = [];
let rehacer = [];

let imagenSeleccionada = "../recursos/pikachu.png";

let colorLinea = "#000000";
let colorRelleno = "#ff9ecf";
let grosorLinea = 5;
let rellenoActivo = true;

const opciones = {
    pincel: true,
    linea: false,
    circulo: false,
    cuadro: false,
    estrella: false,
    borrador: false,
    sticker: false,
}

const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}

let presionado = false;


// EVENTOS CANVAS
// =========================

canvas.addEventListener("mousedown", alPresionarClick);
canvas.addEventListener("mousemove", mientrasPrecionaClick);
canvas.addEventListener("mouseup", alSoltarClick);


// BOTONES HERRAMIENTAS
// =========================

document.querySelector("#btn_pincel").onclick = () => cambiarOpcion("pincel");
document.querySelector("#btn_linea").onclick = () => cambiarOpcion("linea");
document.querySelector("#btn_cuadro").onclick = () => cambiarOpcion("cuadro");
document.querySelector("#btn_circulo").onclick = () => cambiarOpcion("circulo");
document.querySelector("#btn_estrella").onclick = () => cambiarOpcion("estrella");
document.querySelector("#btn_sticker").onclick = () => cambiarOpcion("sticker");
document.querySelector("#btn_borrador").onclick = () => cambiarOpcion("borrador");


// GROZOR DE LINEAS
// =========================
document.querySelector("#colorLinea")
    .addEventListener("input", (e) => {
        colorLinea = e.target.value;
    });

document.querySelector("#colorRelleno")
    .addEventListener("input", (e) => {
        colorRelleno = e.target.value;
    });

document.querySelector("#grosorLinea")
    .addEventListener("input", (e) => {
        grosorLinea = e.target.value;
    });

document.querySelector("#rellenoActivo")
    .addEventListener("change", (e) => {
        rellenoActivo = e.target.checked;
    });


// CAMBIAR OPCION
// =========================

function cambiarOpcion(opcion) {

    for (let clave in opciones) {
        opciones[clave] = false;
    }

    opciones[opcion] = true;
}


// CLICK
// =========================

function alPresionarClick(e) {

    posicionesCursor.iniciales.x = e.offsetX;
    posicionesCursor.iniciales.y = e.offsetY;

    presionado = true;
}

// MOVER MOUSE
// =========================

function mientrasPrecionaClick(e) {

    if (!presionado) return;

    posicionesCursor.finales.x = e.offsetX;
    posicionesCursor.finales.y = e.offsetY;

    let elemento = null;

    // PINCEL
    // =========================

    if (opciones.pincel) {

        ctx.beginPath();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = grosorLinea;

        ctx.moveTo(
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y
        );

        ctx.lineTo(
            posicionesCursor.finales.x,
            posicionesCursor.finales.y
        );

        ctx.stroke();

        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        return;
    }

    // BORRADOR 
    // =========================

    if (opciones.borrador) {

        ctx.beginPath();

        ctx.globalCompositeOperation = "destination-out";

        ctx.lineWidth = 20;

        ctx.lineCap = "round";

        ctx.moveTo(
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y
        );

        ctx.lineTo(
            posicionesCursor.finales.x,
            posicionesCursor.finales.y
        );

        ctx.stroke();

        ctx.globalCompositeOperation = "source-over";

        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        return;
    }

    // FIGURAS
    // =========================

    if (opciones.linea) {

        elemento = new Linea(
            structuredClone(posicionesCursor),
            colorLinea,
            grosorLinea
        );
    }

    else if (opciones.cuadro) {

        elemento = new Cuadrado(
            structuredClone(posicionesCursor),
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.circulo) {

        elemento = new Circulo(
            structuredClone(posicionesCursor),
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.estrella) {

        elemento = new Estrella(
            structuredClone(posicionesCursor),
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.sticker) {

        elemento = new Sticker(
            structuredClone(posicionesCursor),
            imagenSeleccionada
        );
    }


    // VISTA
    // =========================

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let el of elementos) {
        el.Dibujar(ctx);
    }

    if (elemento) {
        elemento.Dibujar(ctx);
    }
}


// SOLTAR CLICK
// =========================

function alSoltarClick(e) {

    presionado = false;

    posicionesCursor.finales.x = e.offsetX;
    posicionesCursor.finales.y = e.offsetY;


  if (opciones.pincel || opciones.borrador) {

    guardarEstadoCanvas();

    return;
}

    let elemento = null;

    if (opciones.linea) {

        elemento = new Linea(
            posicionesCursor,
            colorLinea,
            grosorLinea
        );
    }

    else if (opciones.cuadro) {

        elemento = new Cuadrado(
            posicionesCursor,
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.circulo) {

        elemento = new Circulo(
            posicionesCursor,
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.estrella) {

        elemento = new Estrella(
            posicionesCursor,
            colorLinea,
            colorRelleno,
            grosorLinea,
            rellenoActivo
        );
    }

    else if (opciones.sticker) {

        elemento = new Sticker(
            posicionesCursor,
            imagenSeleccionada
        );
    }

    if (elemento) {
        elementos.push(elemento);
    }
    guardarEstadoCanvas();
    renderizar();
}


// RENDERIZAR
// =========================

function renderizar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let el of elementos) {
        el.Dibujar(ctx);
    }
}


// GUARDAR HISTORIAL
// =========================

function guardarEstado() {

    historial.push(canvas.toDataURL());

    if (historial.length > 20) {
        historial.shift();
    }
}
function guardarEstadoCanvas() {

    historial.push(canvas.toDataURL());

    if (historial.length > 20) {
        historial.shift();
    }
}

// LIMPIAR
// =========================

window.limpiarCanvas = function () {

    elementos.length = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// DESCARGAR
// =========================

window.descargarImagen = function () {

    const link = document.createElement("a");

    link.download = "dibujo.png";

    link.href = canvas.toDataURL();

    link.click();
}

// FILTROS
// =========================

window.filtroBN = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        let gris = (
            data[i] +
            data[i + 1] +
            data[i + 2]
        ) / 3;

        data[i] = gris;
        data[i + 1] = gris;
        data[i + 2] = gris;
    }

    ctx.putImageData(imgData, 0, 0);
}

window.filtroSepia = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        let rojo = data[i];
        let verde = data[i + 1];
        let azul = data[i + 2];

        data[i] =
            rojo * 0.393 +
            verde * 0.769 +
            azul * 0.189;

        data[i + 1] =
            rojo * 0.349 +
            verde * 0.686 +
            azul * 0.168;

        data[i + 2] =
            rojo * 0.272 +
            verde * 0.534 +
            azul * 0.131;
    }

    ctx.putImageData(imgData, 0, 0);
}

window.filtroNegativo = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] = 255 - data[i];

        data[i + 1] = 255 - data[i + 1];

        data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imgData, 0, 0);
}
window.filtroRojo = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] += 50;

        data[i + 1] *= 0.8;

        data[i + 2] *= 0.8;
    }

    ctx.putImageData(imgData, 0, 0);
}

window.filtroVerde = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] *= 0.8;

        data[i + 1] += 50;

        data[i + 2] *= 0.8;
    }

    ctx.putImageData(imgData, 0, 0);
}
window.filtroAzul = function () {

    const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] *= 0.8;

        data[i + 1] *= 0.8;

        data[i + 2] += 50;
    }

    ctx.putImageData(imgData, 0, 0);
}

// OPCIONES
// =========================

document.querySelector("#colorLinea")
    .addEventListener("input", (e) => {
        colorLinea = e.target.value;
    });

document.querySelector("#colorRelleno")
    .addEventListener("input", (e) => {
        colorRelleno = e.target.value;
    });

document.querySelector("#grosorLinea")
    .addEventListener("input", (e) => {
        grosorLinea = e.target.value;
    });

document.querySelector("#rellenoActivo")
    .addEventListener("change", (e) => {
        rellenoActivo = e.target.checked;
    });


// Sticker
// =========================

const inputImagen = document.querySelector("#inputImagen");

inputImagen.addEventListener("change", (e) => {

    const archivo = e.target.files[0];

    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = function (evento) {

        imagenSeleccionada = evento.target.result;
    }

    reader.readAsDataURL(archivo);
});

window.deshacer = function () {

    if (historial.length <= 1) return;

    rehacerHistorial.push(historial.pop());

    let img = new Image();

    img.src = historial[historial.length - 1];

    img.onload = function () {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(img, 0, 0);
    }
}


window.rehacerDibujo = function () {

    if (rehacerHistorial.length === 0) return;

    let estado = rehacerHistorial.pop();

    historial.push(estado);

    let img = new Image();

    img.src = estado;

    img.onload = function () {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(img, 0, 0);
    }
}