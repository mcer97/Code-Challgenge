# Code Challenge, Mario Enríquez

El proyecto esta totalmente hecho desde cero, ninguna librería fue usada excepto por Axios y Font-Awesome.

Para el proyecto de la librería de componentes he usado Rollup y Storybook para hacer prototipado de los componentes fácilmente.

Son dos proyectos, uno es la libreria de componentes que desarrolle para el proyecto en sí y el otro es la aplicación web de React para el Code Challenge.

El proyecto de la aplicación web es muy pequeña ya que utiliza lo que ya esta hecho en la librería de componentes `intertel-components` así que si quieren ver la implementación de todos los componentes entonces revisen `intertel-componenets`.

Todo el proyecto esta desarrollado en ingles.

Nota: Debido a un contra tiempo, la funcionalidad de hora por default no sirve (Puede ser solucionado pero en esta iteración no fue terminada).

## Instalación

Pongan las carpetas de ambos proyectos en el mismo directorio (Importante para uno de los scripts NPM).

En el directorio del proyecto de la Liberia de componentes (intertel-components), abra CMD o PowerShell y ejecute `npm install`
Al hacer  esto las dependencias para el proyecto de los componentes serán instaladas.

Luego ejecute `npm build` para compilar la librería para luego instalarla en la aplicación web de React.

Al hacer esto ya podrán correr las Stories del Storybook para la librería al ejecutar el comando `nmp run storybook`.

---
Para instalar lo necesario para correr la aplicación web entonces
sitúese en el directorio de dicho proyecto y ejecute `npm install` luego ejecute `npm run riic` .

Ahora para ejecutar la aplicación ejecute el comando `npm run start`.

## Funcionalidad extra.
He agregado unas cosas extras tales como poder seleccionar una nueva ciudad o zona horaria como principal al darle clic al numero que esta en lugar de la casita.
También he agregado la posibilidad de irte para atrás y adelante (solo había para ir adelante en la imagen de referencia).


## Extra Kudos
### ¿Que te gustaría agregar o eliminar de este componente para hacerlo mejor?
Me gustaría hacerlo que fuera también para revisar horarios con otras personas y darle colores a las horas de cada día en base a si están disponibles, o algún otro tipo de categoría.

También me gustaría dar la posibilidad de obtener el input para agregar una ciudad en base a una coordenada obtenida por medio de un mapa.

También me gustaría hacerlo responsivo y con versiones aptas para celulares.

También me gustaría agregarle mas controles como `Ir a la hora actual` y dar la posibilidad de guardar perfiles para poder abrirlos después y obtener la misma configuración anterior.

### ¿Cual sería la mejor manera de hacerlo reutilizable/embedible?
Identificar todos las estructuras que pueden ser generalizadas y hacerlas su propio componente. Para los componentes complejos entonces encontrar si hay alguna manera de crear una interfaz que te permita sacar la implementación de la lógica de este hacia afuera para así dejarle al usuario de la librería el control total de cómo quiere usar el componente con sus limitaciones por supuesto.

### Asumiendo que tienes suficiente tiempo, ¿Que te tomaría para llevarlo a un estado de calidad apto para producción?
De 2 - 3 días.

### Si no tuvieras acceso a World Time API, ¿como hubieras diseñado el backend?
Para no tener problemas con licencias entonces usaría directamente la información proveída por IANA Time Zone Database (TZ o zoneinfo o Olson DB)
a lo mismo que el código que también te proveen para tener la información más actualizada sobre cualquier cambio que se haga debido por asunto político o lo que sea
https://www.iana.org/time-zones

El codigo que te proveen es en c, lo que yo haría es adaptar ese código para que automatice obtener todas las entradas para cada zona horaria y cada entidad, y compilar todas en una estructura y guardarla en una base de datos.

Después crearía una REST API o GraphQL API con algún lenguaje o framework mas comúnmente utilizado para dichas APIs como Django, Flask, etc.
