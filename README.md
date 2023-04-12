# DiversityPost.

Implementación de una API que permita publicar opiniones, que otras personas puedan verlas y votar.

## Instrucciones DiversityPost-Node

- Crear una base de datos vacía en una instancia de MySQL local.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Levantar base de datos con el comando `docker compose up --build -d`

- Ejecutar `node ./bbdd/initDB.js` para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Instrucciones DiversityPost-React

- Configurar .env en /diversitypost-node.
- Configurar .env en /diversitypost-react.
- Ejecutar `npm start` para lanzar react.

## Dependencias desarrollo

```
eslint: "^8.31.0"
prettier: "^8.31.0"
nodemon: "^2.0.21"
```

## Dependencias producción

```
"express": "^4.18.2"
"dotenv": "^16.0.3"
"morgan": "^1.10.0"
"mysql2": "^2.3.3"
"jsonwebtoken": "^9.0.0"
"cors": "^2.8.5"
"uuid": "^9.0.0"
"joi": "^17.7.0"
"express-fileupload": "^1.4.0"
"sharp": "^0.31.3"
"bcrypt": "^5.1.0"
"cookie-parser": "^1.4.6"
"fs.promises": "^0.1.2"
```

## Endpoints

- Usuarios:

POST [/user] - Registro de usuario
POST [/user/login] - Login de usuario (devuelve token)
GET [/user/:id] - Devuelve información del usuario QUE FIGURA EN EL TOKEN (necesita cabecera con token)
PUT [/user/edit] - modificar información del usuario
PUT [/user/delete] - Anonimizar usuario

- Posts:

POST [/post] - Permite crear un post (necesita cabecera con token)
GET [/posts] - Listado todos los post
GET [/posts/user] - Listado post del usuario
GET [/post/:id] - Devuelve un post
PUT [/post/:id] - Editar un post
DELETE [/post/:id] - Eliminar un post

- Votes:

POST [/post/:id/vote] - permite votar
DELETE [/post/:id/vote] - Eliminar voto
