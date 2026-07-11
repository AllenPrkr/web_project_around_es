# Around The U.S.

Around The U.S. es una galeria interactiva de lugares desarrollada como parte
de los sprints 6 y 7 de TripleTen. El proyecto usa HTML, CSS y JavaScript
modular para renderizar tarjetas, trabajar con ventanas emergentes y validar
formularios en el navegador.

## Descripcion

La pagina muestra un perfil de usuario y una coleccion de tarjetas con imagenes
de distintos lugares. Las tarjetas iniciales se generan desde un array de
objetos en JavaScript y se crean a partir de un elemento `<template>`.

El usuario puede editar la informacion del perfil, agregar nuevas tarjetas,
marcar tarjetas con "Me gusta", eliminar tarjetas y abrir una vista ampliada de
cada imagen.

## Funcionalidades

- Renderizado dinamico de 6 tarjetas iniciales desde JavaScript.
- Creacion de tarjetas con un elemento `<template>`.
- Edicion del nombre y la descripcion del perfil.
- Agregado de nuevas tarjetas mediante formulario.
- Boton "Me gusta" interactivo en cada tarjeta.
- Eliminacion de tarjetas desde el DOM.
- Vista ampliada de imagenes en una ventana emergente.
- Cierre de ventanas emergentes con el boton de cierre.
- Cierre de ventanas emergentes al hacer clic en la superposicion.
- Cierre de ventanas emergentes al pulsar la tecla `Esc`.
- Validacion del formulario "Editar perfil".
- Validacion del formulario "Nuevo lugar".
- Mensajes de error nativos del navegador.
- Botones de envio inactivos cuando un formulario no es valido.
- Codigo de validacion separado en `scripts/validate.js`.
- JavaScript conectado como modulo desde `index.html`.

## Validacion de formularios

El formulario "Editar perfil" valida:

- Nombre obligatorio.
- Nombre entre 2 y 40 caracteres.
- Acerca de obligatorio.
- Acerca de entre 2 y 200 caracteres.

El formulario "Nuevo lugar" valida:

- Titulo obligatorio.
- Titulo entre 2 y 30 caracteres.
- URL de imagen obligatoria.
- URL de imagen con formato valido.

La validacion utiliza atributos HTML5, `ValidityState` y funciones reutilizables
exportadas desde `scripts/validate.js`.

## Tecnologias

- HTML5
- CSS3
- JavaScript modular
- BEM
- Flexbox
- CSS Grid
- Git y GitHub
- GitHub Pages

## Estructura del proyecto

```text
web_project_around_es/
|-- blocks/        # Archivos CSS organizados por bloques BEM
|-- images/        # Imagenes e iconos del proyecto
|-- pages/         # Archivo CSS principal
|-- scripts/       # Codigo JavaScript
|   |-- index.js
|   `-- validate.js
|-- vendor/        # Normalize.css y fuentes
|-- index.html
`-- README.md
```

## Como ejecutar el proyecto

Como el proyecto usa JavaScript modular (`type="module"`), no debe abrirse con
doble clic como archivo local. Ejecuta un servidor local desde la carpeta del
proyecto:

```powershell
python -m http.server 5500
```

Luego abre esta URL en el navegador:

```text
http://127.0.0.1:5500/index.html
```

Tambien puedes visitar la version publicada en GitHub Pages.

## Enlace al proyecto

[Ver proyecto en GitHub Pages](https://allenprkr.github.io/web_project_around_es/)
