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

function cambiarNumero(event) {
    const numeroElementos = event.target.value;
    const contenido = document.querySelector("#contenedor_correos")
        contenido.innerHTML =""; //Limpia la etiqueta y su contenido antes de agregar  
        for (let i = 0; i <= event.target.value; i++){
            //se agrega contenido usando la insercion de html por el medio del 
            // innerHTML, que agarra todo lo que esta dentro de htmlAgregar
            // este metodo reemplaza todo lo que esta adentro de la etiqueta por 
            //lo nuevo que se quiere agregar 
            
            const htmlAgregar = '<label for=" correo-$(i)"> Ingrese el correo $(i)</label>
                < input type = "email" name="correo-$(i)" id="correo-1" > 
                <br>';


             contenido.innerHTML += htmlAgregar;    
        }
}

                    class Usuario {
                        constructor(nom, ape) {
                        this.nombre = nom;
                    this.apellido = ape;
    }
}
