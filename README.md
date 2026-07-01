# Around The U.S.

Around The U.S. es una galería interactiva de lugares desarrollada como parte
del sprint 6 de TripleTen. El proyecto trabaja con datos en JavaScript,
plantillas HTML y modales para crear una experiencia dinámica en el navegador.

## Descripción

La página muestra un perfil de usuario y una colección de tarjetas con imágenes
de distintos lugares. Las tarjetas iniciales se generan desde un array de
objetos en JavaScript, lo que permite mantener los datos separados del marcado
HTML.

El usuario puede editar la información del perfil, agregar nuevas tarjetas,
marcar tarjetas con "Me gusta", eliminar tarjetas y abrir una vista ampliada de
cada imagen.

## Funcionalidades

- Renderizado dinámico de tarjetas desde un array de datos.
- Uso de un elemento `<template>` para crear nuevas tarjetas.
- Valores predeterminados para tarjetas con datos incompletos.
- Edición del nombre y la descripción del perfil.
- Apertura y cierre de ventanas emergentes reutilizando funciones comunes.
- Agregado de nuevas tarjetas mediante un formulario.
- Botón "Me gusta" interactivo en cada tarjeta.
- Eliminación de tarjetas desde el DOM.
- Vista ampliada de imágenes en un modal.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- BEM
- Flexbox
- CSS Grid
- Git y GitHub
- GitHub Pages

## Estructura del proyecto

```text
web_project_around_es/
├── blocks/        # Archivos CSS organizados por bloques BEM
├── images/        # Imágenes e iconos del proyecto
├── pages/         # Archivo CSS principal
├── scripts/       # Código JavaScript
├── vendor/        # Normalize.css y fuentes
├── index.html
└── README.md
```

## Cómo ejecutar el proyecto

Puedes abrir el archivo `index.html` directamente en el navegador o visitar la
versión publicada en GitHub Pages.

## Enlace al proyecto

[Ver proyecto en GitHub Pages](https://allenprkr.github.io/web_project_around_es/)
