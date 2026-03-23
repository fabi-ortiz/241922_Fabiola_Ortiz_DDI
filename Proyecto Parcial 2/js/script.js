
// ELEMENTOS

const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const registroDiv = document.getElementById("registroDiv");
const irRegistro = document.getElementById("irRegistro");
const volverLogin = document.getElementById("volverLogin");
const inicio = document.getElementById("inicio");
const cerrarSesion = document.getElementById("cerrarSesion");
const contenedor = document.getElementById("contenedorTarjetas");

registroDiv.style.display = "none";
cerrarSesion.style.display = "none";


// CAMBIO DE VISTAS

irRegistro.onclick = () => {
    registroDiv.style.display = "block";
    loginForm.style.display = "none";
};

volverLogin.onclick = () => {
    registroDiv.style.display = "none";
    loginForm.style.display = "block";
};

// REGISTRO

registroForm.onsubmit = (e) => {
    e.preventDefault();

    const nombre = registroForm.nombre.value;
    const apellido = registroForm.apellido.value;
    const correo = registroForm.correo.value;
    const pass = registroForm.contrasena.value;
    const confirmar = registroForm.confirmar.value;
    const fotoInput = document.getElementById("foto");

    if (pass !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }
    const esAdmin = correo === "Ivette.Or@gmail.com";


    const reader = new FileReader();

    reader.onload = function () {
        const usuario = {
            nombre,
            apellido,
            correo,
            contrasena: pass,
            foto: reader.result || "",
            admin: esAdmin
        };

        localStorage.setItem(correo, JSON.stringify(usuario));
        alert("Registrado correctamente");
        registroForm.reset();
    };

    if (fotoInput && fotoInput.files[0]) {
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        reader.onload();
    }

};



// LOGIN

loginForm.onsubmit = (e) => {
    e.preventDefault();

    const correo = loginForm.correo.value;
    const pass = loginForm.contrasena.value;

    const user = JSON.parse(localStorage.getItem(correo));

    if (!user || user.contrasena !== pass) {
        alert("Datos incorrectos");
        return;
    }

    localStorage.setItem("sesion", JSON.stringify(user));
    iniciarApp(user);
};



// INICIAR APP

function iniciarApp(user) {
    document.querySelector(".container").style.display = "none";
    inicio.classList.remove("oculto");
    cerrarSesion.style.display = "block";

    contenedor.innerHTML = "";

    mostrarPerfil(user);

    if (user.admin) {
        vistaAdmin();
    } else {
        vistaVisitante();
    }
}



// PERFIL

function mostrarPerfil(user) {
    const perfilDiv = document.getElementById("perfil");

    perfilDiv.innerHTML = `
        <div class="header">

            <div class="logo">🎬 CineApp</div>

            <div class="user-info">
                <img src="${user.foto || ''}" class="foto">
                <span>${user.nombre}</span>
                <button onclick="editarPerfil()">Editar Perfil</button>
            </div>
          
        </div>
    `;
}


// EDITAR PERFIL

function editarPerfil() {
    let user = JSON.parse(localStorage.getItem("sesion"));

    const nuevoNombre = prompt("Nuevo nombre:", user.nombre);
    const nuevoApellido = prompt("Nuevo apellido:", user.apellido);

    if (!nuevoNombre || !nuevoApellido) return;

    user.nombre = nuevoNombre;
    user.apellido = nuevoApellido;

    localStorage.setItem(user.correo, JSON.stringify(user));
    localStorage.setItem("sesion", JSON.stringify(user));

    alert("Perfil actualizado");
    iniciarApp(user);
}



// VISITANTE

function vistaVisitante() {
    const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

    let html = "";

    if (peliculas.length === 0) {
        html += "<p>No hay películas cargadas</p>";
    }

    peliculas.forEach(p => {
        html += `
            <div class="tarjeta">
                <img src="${p.img || ''}" alt="">
                <h3>${p.titulo}</h3>
                <p>${p.genero}</p>
            </div>
        `;
    });

    contenedor.innerHTML += html;
}



// ADMIN

function vistaAdmin() {
    contenedor.innerHTML += `
        <div class="admin-panel">

            <div class="admin-subida">
                <h2> Subir películas</h2>
                <input type="file" id="fileInput">
                <button onclick="cargarPeliculas()">Subir</button>
            </div>

            <div class="admin-lista">
                   <h2>Películas cargadas</h2>
                <div id="listaPeliculas" class="grid-peliculas"></div>
            </div>

        </div>
    `;

    mostrarPeliculasAdmin();
}



// CARGAR JSON

function cargarPeliculas() {
    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Selecciona un archivo");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            localStorage.setItem("peliculas", JSON.stringify(data));

            mostrarPeliculasAdmin();
        } catch {
            alert("Error en el JSON");
        }
    };

    reader.readAsText(file);
}



// MOSTRAR ADMIN
function mostrarPeliculasAdmin() {
    const data = JSON.parse(localStorage.getItem("peliculas")) || [];

    let html = "";

    if (data.length === 0) {
        html = "<p>No hay películas aún</p>";
    } else {
        data.forEach(p => {
            html += `
                <div class="tarjeta">
                    <img src="${p.img || ''}">
                    <h3>${p.titulo}</h3>
                    <p>${p.genero}</p>
                </div>
            `;
        });
    }

    const lista = document.getElementById("listaPeliculas");
    if (lista) lista.innerHTML = html;
}



// LOGOUT

cerrarSesion.onclick = () => {
    localStorage.removeItem("sesion");
    location.reload();
};



// AUTO LOGIN

window.onload = () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) iniciarApp(sesion);
};