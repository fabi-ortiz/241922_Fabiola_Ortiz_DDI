
const url = "https://pokeapi.co/api/v2/pokemon?limit=20";

//peticion fetch
fetch(url)
.then(respuesta => {
    if (respuesta.ok)
        return respuesta.json();
})
//desenvolviendo los datos obtenidos de la peticion
.then(datos => {
// hacer otra peticion
    for (let i = 0; i < datos.results.length; i++) {
        Peticion2(datos.results[i].url);
    }

})
.catch(error => {
    console.error(error.message);
});


// segunda petición
function Peticion2(url) {

    fetch(url)
    .then(respuesta => {
        if (respuesta.ok)
            return respuesta.json()
    })
    .then(datos => {

        const contenedor = document.querySelector("#contenedor");

        const card = document.createElement("div");
        card.classList.add("card");

        //  TIPOS 
        let tipos = "";
        datos.types.forEach(tipo => {
            tipos += `<span>${tipo.type.name}</span> `;
        });

        //  HABILIDADES
        let habilidades = "";
        datos.abilities.forEach(hab => {
            habilidades += `<li>${hab.ability.name}</li>`;
        });

        card.innerHTML = `
            <img src="${datos.sprites.front_default}" alt="${datos.name}">
            <h3>${datos.name}</h3>
            <p>ID: ${datos.id}</p>
            <p>Altura: ${datos.height}</p>
            <p>Peso: ${datos.weight}</p>
            <p><strong>Tipo:</strong> ${tipos}</p>
            <ul>${habilidades}</ul>
        `;

        contenedor.appendChild(card);

    })
    .catch(error => console.error(error));
}