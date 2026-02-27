// Arreglo donde se guardan los usuarios
let usuarios = [];

document.addEventListener("DOMContentLoaded", function() {

    const registroDiv = document.querySelector("#registroDiv");
    const btnRegistro = document.querySelector("#irRegistro");
    const btnVolver = document.querySelector("#volverLogin");

    // Ocultar registro al iniciar
    registroDiv.classList.add("oculto");

    // Mostrar registro
    btnRegistro.addEventListener("click", function() {
        registroDiv.classList.remove("oculto");
    });

    // Volver a login
    btnVolver.addEventListener("click", function() {
        registroDiv.classList.add("oculto");
    });

});

// REGISTRO
document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let datos = new FormData(this);

    let nombre = datos.get("nombre");
    let apellido = datos.get("apellido");
    let correo = datos.get("correo");
    let contrasena = datos.get("contrasena");
    let confirmar = datos.get("confirmar");

    // Validar campos vacíos
    if (!nombre || !apellido || !correo || !contrasena || !confirmar) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Validar contraseña
    if (contrasena !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Guardar usuario en arreglo
    usuarios.push({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena
    });

    alert("Usuario registrado correctamente");

    document.getElementById("registroForm").reset();
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let datos = new FormData(this);

    let correo = datos.get("correo");
    let contrasena = datos.get("contrasena");

    if (!correo || !contrasena) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Buscar usuario
    let usuarioEncontrado = usuarios.find(u => 
        u.correo === correo && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        alert("Sesión iniciada de forma correcta");
    } else {
        alert("Correo o contraseña incorrectos");
    }

});