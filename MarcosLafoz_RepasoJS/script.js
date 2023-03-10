/*1. Ejercicio de creación de objetos: Crea un objeto llamado "persona" que tenga las siguientes
propiedades: nombre, apellido, edad y correo electrónico. Luego, crea una función que tome como
parámetro un objeto "persona" y devuelva una cadena de texto que diga "Hola, mi nombre es
[nombre] [apellido], tengo [edad] años y mi correo electrónico es [correo electrónico]".*/

let persona = {
  nombre: "Marcos",
  apellido: "Lafoz",
  edad: "18",
  mail: "marcos@lafoz.com"
}

let resultadoEj1 = "Hola mi nombre es " + persona.nombre + " " + persona.apellido + " , tengo " + persona.edad + " años y mi correo electrónico es " + persona.mail


function loadEj1() {
  console.log(resultadoEj1)
  let ej1Cont = document.getElementById("ej1");
  ej1Cont.innerHTML = resultadoEj1
}

/*2. Ejercicio de eventos del DOM: Crea una página web que tenga un botón. Al hacer clic en el botón, se
debe mostrar un mensaje en la consola que diga "Hola mundo!".*/

function clickEj2() {
  console.log("Hola Mundo!")
  let ej2Cont = document.getElementById("ej2");
  ej2Cont.innerHTML = "Hola Mundo!"
}

/*3. Ejercicio de peticiones asíncronas mediante fetch: Crea una página web que tenga un botón. Al hacer
clic en el botón, se debe realizar una petición a una API libre (por ejemplo, la API de citas de
zenquotes.io) utilizando fetch. Luego, muestra las citas y sus autores aprovechando alguna de las
plantillas que has generado en clase con flexbox y/o grid.*/

function clickEj3() {

  let contenedor = document.getElementById("ej3");
  contenedor.style.backgroundColor = '#fff000';
  peticionAsincrona();
}

function peticionAsincrona() {

  let url = 'https://zenquotes.io/api/quotes';

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

    .then(response => response.json())

    .then(data => {
      callback(data);
    })

    .catch(error => {
      console.log('Error al obterner los datos.', error);
    });
}

function callback(data) {
  console.log()
}