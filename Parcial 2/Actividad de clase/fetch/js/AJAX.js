const url = "https://pokeapi.co/api/v2/pokemon?";

// crear el objeto 
// ES EL OBJETO QUE SE ENCARGA DE HACER LAS PETICIONES HTTP DE FORMA ASICRONA 

const xhr = new XMLHttpRequest

// configuramos que tipo de peticion vamos a hacer 
//parametro 1 es el tipo de peticion 
//parametro 2 es la url a donde se hara la peticion 
//parametro 3 es si sera asicrono 
xhr.open('GET', url, true);
//establecemos la cabecera 
xhr.setRequestHeader('Content-type', 'application/json');

// es definir la funcion que se ejedutara cuando el estado de la peticion cambie 
xhr.onreadystatechange = () => {
    //verificamos el estado de la peticion 
    //0= unset, 1= opened, 2= header_recived
    //3= loading, 4= done
    // verificmos que el status cambie a 4 y se complete 
    if (xhr.readyState === 4) {
        
        // verificamos so la respuesta es exitosa (codigos 200 a 299)
        if (xhr.status >= 200 && xhr.status < 300) {

            //hacemos una conversion de la respuesta a formato JSON poderlo convertir a un 
            // objeto de javascript que podamos usar 
            const respuesta = JSON.parse(xhr.responseText);

            console.log(respuesta)
        }
        else {
            // manejamos el error lo mostramos en consola en caso que eñ estatud de la 
            // respuesta no sea 200
            console.error('Error HTTP:', xhr.status, xhr.statusText);
        }
    }
}
// definimos el manejo  de errores en caso de conexion fallida 
//tiempo excedido de la peticion, etc
xhr.onerror = ()=>{

}
// definimos el metodo para manejar el tiempo de espera de la peticion 
xhr.ontimeout=()=>{

}

// definimps eñ tiempo de espera maximo de la peticion si la peticion tarda mas 
xhr.timeout = 2000;


//enviamos la peticion como get ebviamos null, si fuera post o null enviariamos el cuerpo 
// de la peticion 

xhr.send(null)