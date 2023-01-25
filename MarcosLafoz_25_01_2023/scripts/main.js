function manejadorEventoOnload() {

    let titulo = document.getElementById("main-title");
    let fecha = new Date();
    titulo.innerText = 'Farmacias de guardia ' + fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    peticionAsincrona(metodoPintarFarmaciasGrid);

    //const url = 'https://www.zaragoza.es/sede/servicio/farmacia?rf=html&srsname=wgs84&tipo=guardia&start=0&rows=50&distance=500';
    //peticionFetch(url, 'GET', metodoPintarFarmaciasGrid);
}


function peticionAsincrona(metodoCallback) {
    //chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials

    const url = 'https://www.zaragoza.es/sede/servicio/farmacia?rf=html&srsname=wgs84&tipo=guardia&start=0&rows=50&distance=500';
    const http = new XMLHttpRequest();
    http.open("GET", url)
    http.setRequestHeader("accept", "application/json");
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let resultado = JSON.parse(this.responseText)
            metodoCallback(resultado);
        }
    }
    http.send()
}

function metodoPintarFarmacias(response) {
    let contenedor = document.getElementById("listaFarmacias");
    contenedor.innerHTML = '';
    let lista = response.result;
    let htmlGenerado = '';

    lista.forEach(far => {
        htmlGenerado += '<h3>' + far.title + '</h3>';
        htmlGenerado += '<ul><li>' + far.calle + '</li><li>' + far.telefonos + '</li>';
        if (far.email) {
            console.log("tiene email");
            htmlGenerado += '<li>' + far.email + '</li>';
        }
        if (far.horario) {
            htmlGenerado += '<li>' + far.horario + '</li>';
        }
        htmlGenerado += '</ul>';
        if (far.url) {
            htmlGenerado += '<a href="' + far.url + '" target="_blank">' + far.url + '</a>';
        }
        contenedor.innerHTML = htmlGenerado;
    });
}

function metodoPintarFarmaciasGrid(response) {

    let contenedor = document.getElementById("results-container");
    contenedor.innerHTML = '';
    let lista = response.result;
    let htmlGenerado = '';

    lista.forEach(far => {
        htmlGenerado += '<div class="result">';
        htmlGenerado += '<h2>' + far.title + '</h2>';
        htmlGenerado += '<p>Dirección:' + far.calle + '</p>';
        if (far.telefonos) {
            htmlGenerado += 'Teléfono <a href="tel:' + far.telefonos + '">' + far.telefonos + '</a>';
        } else {
            htmlGenerado += '<p>No consta información de teléfono</p>';
        }

        if (far.email) {
            htmlGenerado += '<p><a href="mailto:' + far.email + '">' + far.email + '</a></p>';
        }
        if (far.horario) {
            htmlGenerado += '<p>Horario: ' + far.horario + '</p>';
        }
        if (far.url) {
            htmlGenerado += '<a href="' + far.url + '" target="_blank">' + far.url + '</a>';
        }
        htmlGenerado += '</div>';
        contenedor.innerHTML = htmlGenerado;
    });

}

function peticionFetch(url, metodo, callback) {

    fetch(url, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json())
        .then((data) => callback(data));


    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

}