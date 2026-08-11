# Alrededor de los EE. UU.

Galería interactiva de lugares desarrollada como proyecto de los sprints 6 a 8
de TripleTen. La aplicación permite administrar la información de un perfil y
una colección de tarjetas desde una interfaz adaptable.

## Funcionalidad

- Renderiza seis tarjetas iniciales a partir de datos.
- Permite agregar, eliminar y marcar tarjetas con «Me gusta».
- Abre las imágenes en una ventana emergente con título y texto alternativo.
- Permite editar el nombre y la descripción del perfil.
- Cierra las ventanas emergentes mediante su botón, el fondo o la tecla `Esc`.
- Valida los formularios en tiempo real y muestra mensajes de error.
- Restablece la validación cada vez que se abre un formulario.

## Tecnologías y técnicas

- HTML5 y CSS3
- Diseño adaptable, Flexbox y CSS Grid
- Metodología BEM
- TypeScript con modo estricto
- JavaScript modular (ES Modules)
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
- `UserInfo`: lectura y actualización de los datos del perfil.

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

Después, inicia un servidor local en la carpeta pública:

```powershell
python -m http.server 5500 --directory public
```

Abre `http://127.0.0.1:5500/` en el navegador.

## Demo

[Ver el proyecto en GitHub Pages](https://allenprkr.github.io/web_project_around_es/)
