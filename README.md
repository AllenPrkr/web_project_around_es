# Alrededor de los EE. UU.

Aplicación web responsive para crear y administrar una galería personal de lugares. El usuario puede editar su perfil, cambiar su avatar, publicar fotografías, indicar que una tarjeta le gusta y eliminar sus propias publicaciones.

El proyecto fue desarrollado durante los sprints 6 al 9 del programa de Desarrollo Web de TripleTen. Su objetivo es aplicar JavaScript y TypeScript modular, programación orientada a objetos, validación de formularios y comunicación asíncrona con una API REST en una interfaz basada en un diseño de referencia.

## Demo

[Abrir la aplicación en GitHub Pages](https://allenprkr.github.io/web_project_around_es/)

## ¿Por qué se creó este proyecto?

La aplicación resuelve la necesidad de reunir fotografías de distintos lugares en una galería sencilla y personalizable. Además del resultado visual, el proyecto sirve para practicar cómo dividir una aplicación en componentes con responsabilidades específicas y cómo mantener sincronizada la interfaz con información almacenada en un servidor.

Los objetivos técnicos principales son:

- construir una interfaz adaptable a distintos tamaños de pantalla;
- reutilizar estilos mediante la metodología BEM;
- separar la lógica en clases independientes;
- validar los datos antes de enviarlos;
- consumir una API mediante solicitudes HTTP asíncronas;
- representar en la interfaz únicamente los cambios confirmados por el servidor;
- aprovechar el tipado estricto de TypeScript para reducir errores.

## Funcionalidades

- Consulta el perfil y las tarjetas del usuario al cargar la página.
- Permite editar el nombre y la descripción del perfil.
- Permite actualizar el avatar mediante la URL de una imagen.
- Crea nuevas tarjetas con un título y una URL de imagen.
- Abre cada fotografía en una ventana emergente de mayor tamaño.
- Agrega o elimina el estado «Me gusta» de una tarjeta.
- Muestra la opción de eliminar únicamente en las tarjetas del usuario actual.
- Solicita confirmación antes de eliminar una tarjeta.
- Valida los formularios en tiempo real y desactiva el botón si existen datos inválidos.
- Muestra estados como `Guardando...` y `Eliminando...` mientras se procesa una solicitud.
- Conserva la interfaz sin cambios y registra el error en la consola si una petición falla.
- Cierra las ventanas emergentes mediante el botón de cierre, un clic en el fondo o la tecla `Esc`.

## ¿Cómo funciona?

Al abrir la aplicación, `src/index.ts` crea las instancias de los componentes, registra sus eventos y solicita simultáneamente el perfil y las tarjetas con `Promise.all`. La respuesta del servidor se usa para identificar al usuario, actualizar su información y renderizar la galería.

El flujo general de una acción es el siguiente:

1. El usuario abre un formulario o interactúa con una tarjeta.
2. La clase responsable recoge y valida la información.
3. `Api` realiza la solicitud correspondiente al servidor.
4. Mientras se espera la respuesta, el botón muestra un estado de carga.
5. Si la respuesta es correcta, se actualiza la interfaz y se cierra el formulario cuando corresponde.
6. Si ocurre un error, este se muestra en la consola y la interfaz conserva su estado anterior.

Por ejemplo, al crear un lugar, el formulario entrega el título y el enlace a `Api.addCard()`. La nueva tarjeta se agrega al comienzo de la galería solo después de recibir la confirmación de la API.

## Arquitectura del código

La aplicación usa programación orientada a objetos para mantener separadas las responsabilidades:

| Clase | Responsabilidad |
| --- | --- |
| `Api` | Centraliza las solicitudes, encabezados, métodos HTTP y manejo de respuestas de la API. |
| `Card` | Crea una tarjeta, configura su imagen y controla los eventos de vista previa, «Me gusta» y eliminación. |
| `Section` | Renderiza colecciones y agrega elementos al inicio o al final de un contenedor. |
| `UserInfo` | Lee y actualiza el nombre, la descripción y el avatar mostrados en el perfil. |
| `FormValidator` | Aplica la validación nativa de HTML, muestra errores y controla el estado del botón de envío. |
| `Popup` | Contiene el comportamiento común para abrir y cerrar ventanas emergentes. |
| `PopupWithForm` | Extiende `Popup` para recoger valores y procesar formularios asíncronos. |
| `PopupWithImage` | Extiende `Popup` para mostrar una imagen y su título. |
| `PopupWithConfirmation` | Extiende `Popup` para confirmar la eliminación de una tarjeta. |

`src/index.ts` funciona como punto de entrada y coordinador: conecta las clases mediante callbacks sin mezclar sus responsabilidades internas.

## Comunicación con la API

La configuración de conexión se encuentra en `src/utils/apiConfig.ts`. Todas las peticiones pasan por el método privado `Api.request()`, que combina los encabezados, convierte las respuestas correctas desde JSON y lanza un error cuando el servidor devuelve un estado no exitoso.

| Acción | Método | Endpoint |
| --- | --- | --- |
| Obtener el perfil | `GET` | `/users/me` |
| Obtener las tarjetas | `GET` | `/cards` |
| Editar el perfil | `PATCH` | `/users/me` |
| Cambiar el avatar | `PATCH` | `/users/me/avatar` |
| Crear una tarjeta | `POST` | `/cards` |
| Eliminar una tarjeta | `DELETE` | `/cards/:cardId` |
| Agregar un «Me gusta» | `PUT` | `/cards/:cardId/likes` |
| Quitar un «Me gusta» | `DELETE` | `/cards/:cardId/likes` |

La información persiste en la API de TripleTen, por lo que el perfil, las tarjetas y los «Me gusta» permanecen después de recargar la página.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3, Flexbox y CSS Grid
- Diseño responsive
- Metodología BEM
- TypeScript en modo estricto
- JavaScript modular con ES Modules
- Programación orientada a objetos
- Fetch API, promesas y `async`/`await`
- API REST
- Git y GitHub Pages

No se utilizan frameworks ni dependencias de ejecución. El servidor local incluido usa únicamente módulos nativos de Node.js.

## Estructura del proyecto

```text
web_project_around_es/
├── public/
│   ├── blocks/              # Estilos de los bloques BEM
│   ├── components/          # JavaScript compilado de las clases
│   ├── images/              # Imágenes e iconos de la interfaz
│   ├── pages/               # Hoja de estilos principal
│   ├── utils/               # JavaScript compilado de la configuración
│   ├── index.html           # Estructura de la aplicación
│   └── index.js             # Punto de entrada compilado
├── src/
│   ├── components/          # Clases y tipos escritos en TypeScript
│   ├── utils/               # Configuración de formularios y de la API
│   └── index.ts             # Inicialización y coordinación de componentes
├── server.mjs               # Servidor HTTP local para archivos estáticos
├── tsconfig.json            # Configuración del compilador TypeScript
└── README.md                # Documentación del proyecto
```

Los cambios deben realizarse en `src/`. Al compilar, TypeScript genera los archivos JavaScript equivalentes dentro de `public/`, desde donde el navegador carga la aplicación.

## Instalación y ejecución local

### Requisitos

- [Node.js](https://nodejs.org/) instalado.
- TypeScript 5 o posterior disponible mediante el comando `tsc`.
- Conexión a internet para comunicarse con la API y cargar las imágenes remotas.

### Pasos

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AllenPrkr/web_project_around_es.git
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd web_project_around_es
   ```

3. Compila el código TypeScript:

   ```bash
   tsc
   ```

4. Inicia el servidor local:

   ```bash
   node server.mjs
   ```

5. Abre [http://127.0.0.1:5500/](http://127.0.0.1:5500/) en el navegador.

> No abras `public/index.html` directamente con una dirección `file://`. Los módulos y las solicitudes a la API necesitan ejecutarse desde un origen HTTP.

Como el proyecto no tiene dependencias externas, no es necesario ejecutar `npm install`.

## Validación y reglas de los formularios

La validación se apoya en los atributos nativos de HTML y en la clase `FormValidator`:

- nombre del perfil: entre 2 y 40 caracteres;
- descripción: entre 2 y 200 caracteres;
- título del lugar: entre 2 y 30 caracteres;
- avatar e imagen de la tarjeta: deben ser URL válidas;
- todos los campos son obligatorios.

Cuando un campo no es válido, se muestra el mensaje correspondiente y se desactiva el botón de envío. La validación se restablece cada vez que se abre un formulario.

## Pruebas manuales sugeridas

Después de iniciar el proyecto, se puede comprobar lo siguiente:

1. Recargar la página y verificar que el perfil y las tarjetas se obtienen del servidor.
2. Editar el perfil y confirmar que los datos permanecen después de recargar.
3. Intentar enviar cada formulario vacío o con una URL inválida y revisar los mensajes de validación.
4. Crear una tarjeta y comprobar que aparece al inicio de la galería.
5. Marcar y desmarcar una tarjeta con «Me gusta».
6. Abrir una imagen y cerrar la ventana con el botón, el fondo y la tecla `Esc`.
7. Eliminar una tarjeta propia y verificar que antes aparece una confirmación.
8. Revisar la interfaz en vista móvil y de escritorio.

## Diseño responsive y accesibilidad

La distribución usa Grid y Flexbox para adaptarse desde pantallas móviles hasta escritorio. La galería reorganiza automáticamente sus columnas y el perfil cambia su composición en resoluciones reducidas.

Las imágenes incluyen texto alternativo, los botones de icono cuentan con etiquetas accesibles y el botón de «Me gusta» actualiza el atributo `aria-pressed` para comunicar su estado.

## Posibles mejoras

- Mostrar mensajes visibles en la página cuando falle una petición, además del registro en consola.
- Añadir indicadores de carga inicial para el perfil y la galería.
- Incorporar pruebas automatizadas unitarias y de interfaz.
- Gestionar la configuración de la API mediante variables de entorno durante el proceso de compilación.
- Agregar conteo de «Me gusta» si la API proporciona esa información.

## Autor

Proyecto realizado por [AllenPrkr](https://github.com/AllenPrkr) como parte del programa de Desarrollo Web de TripleTen.
