// Arreglo donde se guardan los usuarios
//recuperar los usuarios guardados en localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];



document.addEventListener("DOMContentLoaded", function () {

    const registroDiv = document.querySelector("#registroDiv");
    const btnRegistro = document.querySelector("#irRegistro");
    const btnVolver = document.querySelector("#volverLogin");

    // Ocultar registro al iniciar
    registroDiv.classList.add("oculto");

    // Mostrar registro
    btnRegistro.addEventListener("click", function () {
        registroDiv.classList.remove("oculto");
    });

    // Volver a login
    btnVolver.addEventListener("click", function () {
        registroDiv.classList.add("oculto");
    });

});


// REGISTRO
document.getElementById("registroForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let datos = new FormData(this);

    let nombre = datos.get("nombre");
    let apellido = datos.get("apellido");
    let correo = datos.get("correo");
    let contrasena = datos.get("contrasena");
    let confirmar = datos.get("confirmar");

    if (!nombre || !apellido || !correo || !contrasena || !confirmar) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (contrasena !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    usuarios.push({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    document.getElementById("registroForm").reset();

});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let datos = new FormData(this);

    let correo = datos.get("correo");
    let contrasena = datos.get("contrasena");

    if (!correo || !contrasena) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let usuarioEncontrado = usuarios.find(u =>
        u.correo === correo && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {

        alert("Sesión iniciada de forma correcta");

        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("usuario", usuarioEncontrado.nombre);

        mostrarInicio();

    } else {

        alert("Correo o contraseña incorrectos");

    }

});


// MOSTRAR INICIO
function mostrarInicio() {

document.querySelector(".container").classList.add("oculto");
document.getElementById("inicio").classList.remove("oculto");

    obtenerPerritos();

}


// API DE PERRITOS
function obtenerPerritos() {

    fetch("https://dog.ceo/api/breeds/image/random/12")
        .then(res => res.json())
        .then(data => {

            const contenedor = document.getElementById("contenedorTarjetas");
            contenedor.innerHTML = "";

            data.message.forEach(perro => {

                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                tarjeta.innerHTML = `
                <img src="${perro}" width="200">
                <p>Perrito feliz </p>
            `;

                contenedor.appendChild(tarjeta);

            });

        });

}


// CERRAR SESIÓN
document.addEventListener("click", function (e) {

    if (e.target.id === "cerrarSesion") {
        localStorage.removeItem("sesionActiva");
        location.reload();
    }

});


// VERIFICAR SESIÓN AL CARGAR
window.addEventListener("load", function () {

    if (localStorage.getItem("sesionActiva") === "true") {
        mostrarInicio();
    }

});


// OBSERVER
const contenedor = document.getElementById("contenedorTarjetas");

if (contenedor) {

    const observer = new MutationObserver(function () {
        console.log("Se agregaron tarjetas al DOM");
    });

    observer.observe(contenedor, {
        childList: true
    });

}