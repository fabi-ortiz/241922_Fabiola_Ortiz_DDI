/*setTimeout(()=>{
    console.log("esto es un callback");
},1000);*/ //primera forma de trabajar el callback

console.log("esto es el final");


class Usuario{
    constructor(nombre,correo){
        this.nombre = nombre;
        this.correo = correo;
    }
    callback(funcion){
        if ( typeof funcion === "function"){
            console.log("Este es el callback dentro de usuartio ")
            funcion(this.nombre, this.correo)
        }
    }
}

const usuarioActual = new Usuario("Fabiola Ortiz. 05fabisortiz@gmail");
usuarioActual.callback((nombre,correo)=>{
    console.log("esta es la funcion que envio desde el usuario actual",nombre, correo);
})