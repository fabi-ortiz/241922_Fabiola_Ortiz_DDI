/*const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function(){
        if (exito){
            resolve("tarea finalizada")
        }
        else{
            reject("la tarea fallo")
        }
    },1000)
}); 

promesa.then((resultado)=>{
    console.log(resultado)
}
).catch((error) =>{
    console.log(error);
})*/
//FETCH
/*let peticionfetch = new Promise((resolve, reject)=>{
    const url ="https://pokeapi.co/api/v2/pokemon";
    fetch(url).then(resultado =>{
        if(resultado.ok)
            return resultado.json()
    }).then(datos => {
        resolve(datos);
    }).catch(error =>{
        reject(error);
    })

});

peticionfetch.then(resultadoPeticion =>{
    console.log(resultadoPeticion);

}).catch(error =>{
    console.log(error);
})
*/

// promesa para una pantalla de carga con espera de 1 o 2 segundo
/*const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function(){
        if (exito){
            resolve("la pagina cargo correctamente ")
        }
        else{
            reject("la pagina fallo")
        }
    },2000)
}); 

promesa.then((resultado)=>{
    console.log(resultado)
     loader.style.display = "none";
    contenido.style.display = "block";
}
).catch((error) =>{
    console.log(error);
})*/

const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout( async function(){
        if (exito){
            await resolve("tarea finalizada")
        }
        else{
            await reject("la tarea fallo")
        }
    },1000)
}); 

async function functionPirncipal() {
    const
}
promesa.then((resultado)=>{
    console.log(resultado)
}
).catch((error) =>{
    console.log(error);
})