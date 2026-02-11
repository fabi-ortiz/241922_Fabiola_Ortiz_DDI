const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton_guardar = document.querySelector("#boton_guardar");
boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    //CREA UN OBJETO USUARIO
    const usuario = new Usuario(nombre.value, apellido.value);

    console.log(usuario);
    //METODO DE EL OBJETO DOCUMENT QUE SE ENCARGA DE CREAR ELEMENTOS 
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);
})
class Usuario {
    constructor(nom, ape) {
        this.nombre = nom;
        this.apellido = ape;
    }
}
