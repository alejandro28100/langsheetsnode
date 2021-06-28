# Langsheets App

Este es el proyecto final del curso Backend con Node.js Santander

## Justificación
La creación de actividades personalizadas es una problemática presente en campo de la enseñanza de idiomas. Encontrar en libros o internet actividades que conincidan con los objetivos y necesidades de cada salón de clases puede ser una tarea muy agotante. Con la pandemia , la necesidad de creación de actividades digitales y personalizadas incrementó. Este proyecto intenta crear una herramienta que pueda ser útil para la enseñanza de idiomas de manera personal y virtual.      

## Descripción del Proyecto

Este proyecto consiste en una aplicación para la creación y aplicación de actividades digitales enfocadas a la enseñanza de idiomas. En un futuro se espera poder aumentar el rango de actividades que se puedan crear en la aplicación y ampliar las posibilidades de edición de contenido (color de texto, marcatextos, tablas, inserción de audio y video).

## Tecnologias Utilizadas

Editor de texto - [Slate JS](https://docs.slatejs.org/) <br/>
Drag & Drop - [React DnD](https://react-dnd.github.io/react-dnd/about)<br/>
Communicación en tiempo real - [Socket.IO](https://socket.io/) <br/>
Back-End - [Node](https://nodejs.org/es/) & [Express](https://expressjs.com/es/) <br/> 
Front-End - React & [Chakra UI](https://chakra-ui.com/)<br/>
Base de datos - [MongooDB](https://www.mongodb.com/es) & [Mongoose](https://mongoosejs.com/) <br/>
Autenticación -  [Bcrypt](https://www.npmjs.com/package/bcryptjs) & [JWT](https://jwt.io/)

## Funciones

Creación de actividades digitales (Soporta actualmente ejercicios tipo [cloze](https://en.wikipedia.org/wiki/Cloze_test) y [word-order](https://www.google.com/search?q=scrambled+sentences+exercises&safe=strict&sxsrf=ALeKk02DHIRL1kUcoXTkVpY2m5f2KiGfwg:1624860039738&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjKnOmr07nxAhVQKKwKHeXlCqIQ_AUoAXoECAEQBA&cshid=1624860112888528&biw=1470&bih=766#imgrc=yt5x8IK9hxC_gM)) <br/>

Búsqueda de actividades por palabras clave e idioma. <br/>

Función para clonar actividades de otros usuarios. <br/>

Aplicación de actividades en tiempo real (profesor y alumnos) y de manera asíncrona (unicamente alumno). <br/>

Impresión de actividades

 ## Links

[Langsheets React App](https://github.com/alejandro28100/langsheets)

[Link de la app hosteada en Heroku](https://langsheets.herokuapp.com/)
