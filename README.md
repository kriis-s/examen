Proyecto realizado para el examen de Programacion de Componentes.

La pagina es una tienda llamada Dibujitos, Vende laminas, posters y stickers digitales con dibujos infantiles listos para imprimir.

Tecnologias usadas:

React con Vite
React Router
Bootstrap
Firebase
Firestore Database
Firebase Auth
Cordova para Android

Requisitos trabajados:

Proyecto React creado con Vite.
Componentes funcionales y componente de clase.
Componente padre para la lista de productos.
Componente hijo para mostrar cada producto.
Uso de props.
Comunicacion hijo a padre con callbacks.
Listado de productos con map.
Carrito usando state y this.setState.
Formulario con validaciones.
Rutas con react-router-dom.
Ruta con parametro para ver el detalle de un producto.
Guardado de datos del formulario en Firestore.
Estilos con Bootstrap y CSS.
Firebase Auth implementado.
Firebase Storage implementado en codigo.
Proyecto Cordova para Android.
APK debug listo y probado en telefono.
APK release firmado listo.

Como ejecutar el proyecto:

1 Instalar dependencias:  npm install

2 Ejecutar en modo desarrollo: npm run dev

3 Crear version de produccion: npm run build

4 Revisar errores: npm run lint

---------------------------------------

Firebase:

El archivo .env contiene la configuracion del proyecto Firebase.

En Firebase se uso:
Authentication
Firestore Database
Storage preparado en codigo

La coleccion usada para guardar formularios se llama:

contactos

Pagina publicada:

https://examen-7dd8b.web.app
https://github.com/kriis-s/examen
https://gleeful-puppy-ac56b7.netlify.app/

-----------------------------------------

Cordova y APK:

El proyecto Cordova esta en la carpeta: cordova-app

Comandos usados:

npm run mobile:sync
npm run mobile:build
npm run mobile:release:signed

APK debug:

cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk

APK release firmado:

cordova-app/platforms/android/app/build/outputs/apk/release/app-release.apk

Tambien se genero un archivo AAB:

cordova-app/platforms/android/app/build/outputs/bundle/release/app-release.aab

La keystore se creo localmente en:

keystore/dibujitos-release.keystore
