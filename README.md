# Alrededor de los EE. UU. — Sprint 9

Galería interactiva de lugares desarrollada como proyecto de los sprints 6 a 9
de TripleTen. La aplicación está conectada a la API de «Alrededor de los EE. UU.»
para conservar el perfil y las tarjetas en el servidor.

## Funcionalidad

- Carga en paralelo el perfil y las tarjetas de la cuenta autenticada.
- Permite agregar y eliminar tarjetas persistentes.
- Solicita confirmación antes de eliminar una tarjeta propia.
- Guarda y elimina «Me gusta» mediante la API.
- Abre las imágenes en una ventana emergente con título y texto alternativo.
- Permite editar el nombre, la descripción y el avatar del perfil.
- Muestra estados de carga durante los envíos y conserva la interfaz si falla
  una solicitud.
- Cierra las ventanas emergentes mediante su botón, el fondo o la tecla `Esc`.
- Valida los formularios en tiempo real y muestra mensajes de error.
- Restablece la validación cada vez que se abre un formulario.

## Tecnologías y técnicas

- HTML5 y CSS3
- Diseño adaptable, Flexbox y CSS Grid
- Metodología BEM
- TypeScript con modo estricto
- JavaScript modular (ES Modules)
- Fetch API, promesas y solicitudes HTTP REST
- Programación orientada a objetos
- Encapsulamiento, herencia, composición y callbacks
- Git y GitHub Pages

## Arquitectura

El código fuente se encuentra en `src/`. Cada responsabilidad está encapsulada
en una clase independiente:

- `FormValidator`: validación reutilizable mediante un objeto de configuración.
- `Card`: creación y comportamiento de una tarjeta.
- `Section`: renderizado de colecciones de elementos.
- `Popup`: comportamiento común de las ventanas emergentes.
- `PopupWithImage`: presentación ampliada de una imagen.
- `PopupWithForm`: lectura y envío de formularios.
- `PopupWithConfirmation`: confirmación reutilizable para acciones destructivas.
- `UserInfo`: lectura y actualización de los datos del perfil.
- `Api`: acceso centralizado a todos los endpoints del servidor y manejo de
  respuestas HTTP.

Los archivos estáticos y la salida compilada se guardan en `public/`. El archivo
`src/index.ts` crea las instancias, conecta sus callbacks y registra los eventos
específicos de la página.

```text
web_project_around_es/
├── public/
│   ├── blocks/          # Estilos de bloques BEM
│   ├── images/          # Imágenes e iconos
│   ├── pages/           # Hoja de estilos principal
│   ├── vendor/          # Normalize y fuentes
│   └── index.html
├── src/
│   ├── components/      # Clases TypeScript
│   ├── utils/           # Configuración y datos iniciales
│   └── index.ts         # Punto de entrada
├── tsconfig.json
└── README.md
```

## Compilación y ejecución

Compila el proyecto desde la raíz:

```powershell
tsc
```

Después, inicia el servidor local incluido en el proyecto:

```powershell
node server.mjs
```

Abre `http://127.0.0.1:5500/` en el navegador.

> No abras `public/index.html` directamente desde el explorador de archivos.
> Una dirección que empieza por `file://` no proporciona un origen HTTP válido
> para las solicitudes a la API y puede dejar la galería vacía.

## Demo

[Ver el proyecto en GitHub Pages](https://allenprkr.github.io/web_project_around_es/)
