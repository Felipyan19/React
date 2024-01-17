# Masivos-WhatsApp: Plataforma de Mensajería Masiva de WhatsApp

Bienvenido a Masivos-WhatsApp, una potente plataforma web construida con Vite y React que te permite enviar mensajes de forma masiva a través de WhatsApp. Esta aplicación simplifica el proceso de mensajería con integraciones meta y ofrece funciones robustas para gestionar campañas, usuarios y plantillas.

## Características Clave

- **Mensajería Masiva de WhatsApp**: Envía eficientemente mensajes a múltiples destinatarios a través de WhatsApp.

- **Autenticación Segura**: Inicia sesión de manera segura y fácil con opciones de recuperación de contraseña para mantener la privacidad de tu cuenta.

- **Gestión de Campañas**: Visualiza y gestiona campañas activas, obteniendo información detallada sobre su estado y configuración.

- **Plantillas Personalizadas**: Utiliza integraciones meta para acceder a plantillas personalizadas, simplificando el proceso de creación de mensajes.

- **Historial de Mensajes**: Explora un historial detallado de mensajes enviados, incluyendo información sobre los números correspondientes.

- **Configuración Flexible**: Ajusta y modifica fácilmente la configuración de campañas y usuarios desde la página de configuración.

## Guía Rápida

### Inicio de Sesión

1. Accede a la plataforma mediante el proceso de inicio de sesión.
2. Utiliza las opciones de recuperación de contraseña si es necesario.

### Tablero

1. Navega por el menú para acceder a diferentes secciones: Campañas, Mensajes, Configuración, etc.
2. Visualiza y gestiona tus campañas activas.

### Envío de Mensajes

1. Crea mensajes masivos utilizando plantillas personalizadas.
2. Rastrea mensajes enviados y números asociados.

### Configuración

1. Ajusta la configuración de campañas y usuarios según tus necesidades.
2. Añade y modifica campañas para adaptarlas a tu estrategia de marketing.

¡Comienza a enviar mensajes masivos de WhatsApp de manera efectiva con Mass-WhatsApp!

## Desarrollador

Esta aplicación ha sido desarrollada utilizando Vite y React. Puedes revisar el código fuente y contribuir al desarrollo en nuestro repositorio de GitHub.

[GitHub Repositorio](https://github.com/FelipyanCCG/Masivos)


### Table of Contents

*   [useFormConfig][1]
    *   [Parameters][2]
*   [handleUserSelection][3]
    *   [Parameters][4]
*   [handleCampañaSelection][5]
    *   [Parameters][6]
*   [handleSubmit][7]
    *   [Parameters][8]
*   [handleSubmit][9]
    *   [Parameters][10]
*   [handleSubmit][11]
    *   [Parameters][12]
*   [useMyNotification][13]
*   [closeToast][14]
    *   [Parameters][15]
*   [closeToast][16]
*   [closeToast][17]
*   [handleOutsideClick][18]
    *   [Parameters][19]
*   [useResetPassword][20]
    *   [Parameters][21]
*   [sendResetPassword][22]
*   [handleEmailChange][23]
    *   [Parameters][24]
*   [handleEmailChange][25]
    *   [Parameters][26]
*   [Modal][27]
    *   [Parameters][28]
*   [Toast][29]
    *   [Parameters][30]
*   [useNotificationDetails][31]
*   [startStop][32]
*   [clickNumberFail][33]
*   [useNabvar][34]
*   [handleScroll][35]
*   [toast][36]
*   [restore][37]
*   [useSendExample][38]
*   [handeSend][39]
    *   [Parameters][40]
*   [handeSend][41]
    *   [Parameters][42]
*   [sendExampleData][43]
*   [handleNumeroEjemplo][44]
    *   [Parameters][45]
*   [handleSendExample][46]
*   [useSendExcel][47]
*   [useEffect][48]
*   [useEffect][49]
*   [useEffect][50]
*   [handleFileChange][51]
    *   [Parameters][52]
*   [onerror][53]
    *   [Parameters][54]
*   [handleBucleSend][55]
*   [sendExcelData][56]
*   [handleclickSendExcel][57]
*   [useTemplate][58]
*   [plantillaSelect][59]
    *   [Parameters][60]
*   [newTemplates][61]
    *   [Parameters][62]
*   [clickRefreshTemplates][63]
*   [urlImageTemplate][64]
    *   [Parameters][65]
*   [useConfig][66]
    *   [Parameters][67]
*   [handleCreate][68]
*   [nameButton][69]
*   [MasivosProvider][70]
    *   [Parameters][71]
*   [useSignIn][72]
*   [handlePasswordChange][73]
    *   [Parameters][74]
*   [toggleShowPassword][75]
*   [handleResetPassword][76]

## useFormConfig

Genera la configuración del formulario para el hook useForm.

### Parameters

*   `options` **[Object][77]** Las opciones para la configuración del formulario.

    *   `options.tokenUser` **[string][78]** El token del usuario.
    *   `options.title` **[string][78]** El título del formulario.
    *   `options.api` **[Function][79]** La función de la API a ser llamada.
    *   `options.closeToast` **[Function][79]** La función para cerrar el mensaje.

Returns **[Object][77]** El objeto de configuración del formulario.

## handleUserSelection

Maneja el evento de selección de usuario.

### Parameters

*   `e` **[Event][80]** El objeto de evento que representa la selección de usuario.

Returns **void** Esta función no devuelve nada.

## handleCampañaSelection

Maneja la selección de una campaña.

### Parameters

*   `e` **[Event][80]** El objeto de evento que representa el evento de selección.

Returns **void** No hay valor de retorno.

## handleSubmit

Maneja la presentación del formulario.

### Parameters

*   `e` **[Event][80]** El objeto de evento.

Returns **[Promise][81]\<void>** Devuelve una promesa que se resuelve a indefinido.

## handleSubmit

Maneja la presentación del formulario de manera asíncrona.

### Parameters

*   `e` **[Event][80]** El evento de presentación del formulario.

## handleSubmit

Envía el formulario cuando es desencadenado por un evento.

### Parameters

*   `e` **[Event][80]** El evento que desencadenó el envío del formulario.

Returns **void** Esta función no devuelve ningún valor.

## useMyNotification

Función para usar la notificación.

Returns **[object][77]** Un objeto con la función closeToast.

## closeToast

Cierra la notificación de toast.

### Parameters

*   `null-null` **ninguno** Esta función no toma ningún parámetro.

Returns **ninguno** Esta función no devuelve ningún valor.

## closeToast

Cierra la notificación y realiza acciones adicionales.

Returns **[undefined][82]** Esta función no devuelve ningún valor.

## closeToast

Cierra el aviso.

Returns **void**&#x20;

## handleOutsideClick

Maneja eventos de clic que ocurren fuera del elemento de toast.

### Parameters

*   `e` **[Event][80]** El objeto de evento de clic.

## useResetPassword

Genera el comentario de función para el cuerpo de la función dada en un bloque de código markdown
con la sintaxis de lenguaje correcta.

### Parameters

*   `params` **[Object][77]** un valor booleano que indica si mostrar el campo de contraseña

    *   `params.params` &#x20;

Returns **[Object][77]** un objeto que contiene el email, closeToast, sendResetPassword,
handleEmailChange, showPasword y funciones handleSubmit

## sendResetPassword

Envía un correo electrónico para restablecer la contraseña.

Returns **[Promise][81]** Una promesa que se resuelve cuando se envía el correo electrónico.

## handleEmailChange

Maneja el evento de cambio del campo de entrada de correo electrónico.

### Parameters

*   `event` **[Event][80]** El objeto de evento que representa el evento de cambio.

Returns **void** Esta función no devuelve nada.

## handleEmailChange

Maneja el evento de cambio para el campo de entrada de correo electrónico.

### Parameters

*   `e` **[Event][80]** El objeto de evento de cambio.

Returns **void** Esta función no devuelve nada.

## Modal

Muestra un modal con una notificación tipo toast.

### Parameters

*   `mode` **[string][78]** El modo del toast (por ejemplo, "success", "error", "warning").
*   `mensaje` **[string][78]** El mensaje que se mostrará en el toast.

## Toast

Crea una notificación tipo toast con un modo y mensaje dados.

### Parameters

*   `mode` **[string][78]** El modo de la notificación toast (por ejemplo, "success", "error", "warning").
*   `mensaje` **[string][78]** El mensaje que se mostrará en la notificación toast.

## useNotificationDetails

Genera un gancho personalizado que proporciona detalles y funcionalidades de notificación.

Returns **[object][77]** Un objeto que contiene las siguientes funciones:*   closeToast: Una función que cierra la notificación y realiza acciones adicionales.
*   startStop: Una función que alterna el estado de ejecución de las notificaciones.
*   clickNumberFail: Una función que alterna la visualización del recuento de notificaciones fallidas.

## startStop

Alterna el valor de `isRuning`.

Returns **void** No hay valor de retorno.

## clickNumberFail

Alterna el valor de `numberFail` y actualiza el estado.

Returns **[undefined][82]** No hay valor de retorno.

## useNabvar

Devuelve un objeto que contiene el nombre del usuario, si la página está desplazada y dos funciones para mostrar una notificación toast y restaurar los datos de la sesión.

Returns **[object][77]** Un objeto con las siguientes propiedades:
\- name: El nombre del usuario.
\- isScrolled: Un booleano que indica si la página está desplazada.
\- toast: Una función para mostrar una notificación toast.
\- restore: Una función para restaurar los datos de la sesión.

## handleScroll

Maneja el evento de desplazamiento.

Returns **void** Esta función no devuelve un valor.

## toast

Una función para mostrar una notificación toast.

Returns **void** Esta función no devuelve un valor.

## restore

Restaura el estado del contexto y muestra un modal de información para una sesión cerrada.

Returns **void** Esta función no devuelve un valor.

## useSendExample

Genera un comentario de función para el cuerpo de la función dada.

Returns **[Object][77]** Un objeto que contiene dos funciones: `handleNumeroEjemplo` y `handleSendExample`.

## handeSend

Maneja la operación de envío.

### Parameters

*   `phone` **[string][78]** El número de teléfono al que se enviará el mensaje.

Returns **[Promise][81]\<any>** Una promesa que se resuelve con el resultado de la operación de envío.

## handeSend

Maneja el envío de datos basado en ciertas condiciones.

### Parameters

*   `item` **[Object][77]** el elemento a enviar

Returns **[Promise][81]\<any>** una promesa que se resuelve con el resultado de la operación de envío

## sendExampleData

Envía datos de ejemplo de forma asíncrona.

Returns **[Promise][81]\<void>** Una promesa que se resuelve cuando se envían los datos.

## handleNumeroEjemplo

Una descripción de toda la función.

### Parameters

*   `e` **type** el objeto de evento

Returns **type** indefinido

## handleSendExample

Ejecuta la función handleSendExample.

Returns **void** Esta función no devuelve un valor.

## useSendExcel

Genera comentarios de funciones para el cuerpo de la función dada en un bloque de código de markdown con la sintaxis del lenguaje correcto.

Returns **[object][77]** Un objeto que contiene las siguientes funciones:*   handleFileChange: Una función que maneja el evento de cambio de archivo.
*   handleclickSendExcel: Una función que maneja el evento de clic para enviar los datos de Excel.

## useEffect

Rastrea el estado de `tokenUser` y actualiza `currentTokenUser`.

Returns **void**&#x20;

## useEffect

Monitorea el estado de `isRefresh` y controla el proceso de envío
basado en `isRefresh` y la comparación entre `procesado` y
`excelLength`.

Returns **void**&#x20;

## useEffect

Observa el estado de `isRuning` y desencadena `handleBucleSend` cuando
`isRuning` es false.

Returns **void**&#x20;

## handleFileChange

Maneja el evento de cambio de archivo.

### Parameters

*   `e` **[object][77]** El objeto de evento.

Returns **void** No hay valor de retorno.

## onerror

Maneja el error cuando no se pudo leer el archivo.

### Parameters

*   `event` **[Event][80]** El objeto de evento.

Returns **void** No hay valor de retorno.

## handleBucleSend

Maneja el envío de datos en un bucle.

Returns **[Promise][81]\<void>** Una promesa que se resuelve cuando se completa el envío de datos.

## sendExcelData

Envía datos de Excel.

Returns **[Promise][81]\<void>** Una promesa que se resuelve cuando los datos se han enviado con éxito.

## handleclickSendExcel

Maneja el evento de clic para enviar datos de Excel.

Returns **[undefined][82]** No hay valor de retorno.

## useTemplate

Genera el comentario de función para la función useTemplate.

Returns **[object][77]** Un objeto que contiene las siguientes funciones:*   plantillaSelect: Una función que maneja la selección de una plantilla.
*   clickRefreshTemplates: Una función que actualiza las plantillas.
*   urlImageTemplate: Una función que establece la URL de la imagen de la plantilla.

## plantillaSelect

Genera el comentario de función para el cuerpo de la función.

### Parameters

*   `e` **[Event][80]** El objeto de evento.

Returns **void** Esta función no devuelve nada.

## newTemplates

Genera nuevas plantillas de forma asíncrona.

### Parameters

*   `tokenUser` **type** el token de usuario
*   `homeDataClientId` **type** el ID del cliente de datos del hogar

Returns **type** ninguno

## clickRefreshTemplates

Hace clic en el botón "Actualizar plantillas" y realiza las siguientes acciones:

1.  Llama a la función "refreshTemplates" con los parámetros "tokenUser" y "homeDataClient?.id".
2.  Llama a la función "newTemplates".
3.  Muestra un mensaje de éxito usando Swal.fire.

Returns **[Promise][81]\<void>** Una promesa que se resuelve cuando se completan todas las acciones.

## urlImageTemplate

Establece la URL de la plantilla según el valor de destino.

### Parameters

*   `e` **[Event][80]** El objeto de evento que contiene el valor de destino.

Returns **void** Esta función no devuelve ningún valor.

## useConfig

Genera un hook personalizado que gestiona el estado de configuración para un título específico.

### Parameters

*   `config` **[Object][77]** El objeto de configuración.

    *   `config.title` **[string][78]** El título de la configuración.

Returns **[Object][77]** Un objeto que contiene el estado y funciones para gestionar la configuración.

## handleCreate

Maneja la operación de creación.

Returns **void** No hay valor de retorno.

## nameButton

Devuelve la etiqueta para el botón según el valor de la variable 'title'.

Returns **[string][78]** La etiqueta para el botón.

## MasivosProvider

Exporta un componente proveedor que envuelve a los elementos hijos dados
y proporciona un contexto para gestionar el estado y los datos relacionados con la aplicación Masivos.

### Parameters

*   `props` **[Object][77]** Las propiedades del componente.

    *   `props.children` **ReactNode** Los elementos hijos que se envuelven.

Returns **ReactElement** El componente envuelto.

## useSignIn

Genera un hook personalizado para manejar la funcionalidad de inicio de sesión.

Returns **[Object][77]** Un objeto que contiene varias funciones y variables de estado relacionadas con el inicio de sesión.

## handlePasswordChange

Maneja el evento de cambio para el campo de entrada de contraseña.

### Parameters

*   `e` **[Event][80]** El objeto de evento de cambio.

## toggleShowPassword

Alterna la visibilidad de la contraseña.

Returns **void**&#x20;

## handleResetPassword

Restablece la contraseña del usuario.

[1]: #useformconfig

[2]: #parameters

[3]: #handleuserselection

[4]: #parameters-1

[5]: #handlecampañaselection

[6]: #parameters-2

[7]: #handlesubmit

[8]: #parameters-3

[9]: #handlesubmit-1

[10]: #parameters-4

[11]: #handlesubmit-2

[12]: #parameters-5

[13]: #usemynotification

[14]: #closetoast

[15]: #parameters-6

[16]: #closetoast-1

[17]: #closetoast-2

[18]: #handleoutsideclick

[19]: #parameters-7

[20]: #useresetpassword

[21]: #parameters-8

[22]: #sendresetpassword

[23]: #handleemailchange

[24]: #parameters-9

[25]: #handleemailchange-1

[26]: #parameters-10

[27]: #modal

[28]: #parameters-11

[29]: #toast

[30]: #parameters-12

[31]: #usenotificationdetails

[32]: #startstop

[33]: #clicknumberfail

[34]: #usenabvar

[35]: #handlescroll

[36]: #toast-1

[37]: #restore

[38]: #usesendexample

[39]: #handesend

[40]: #parameters-13

[41]: #handesend-1

[42]: #parameters-14

[43]: #sendexampledata

[44]: #handlenumeroejemplo

[45]: #parameters-15

[46]: #handlesendexample

[47]: #usesendexcel

[48]: #useeffect

[49]: #useeffect-1

[50]: #useeffect-2

[51]: #handlefilechange

[52]: #parameters-16

[53]: #onerror

[54]: #parameters-17

[55]: #handlebuclesend

[56]: #sendexceldata

[57]: #handleclicksendexcel

[58]: #usetemplate

[59]: #plantillaselect

[60]: #parameters-18

[61]: #newtemplates

[62]: #parameters-19

[63]: #clickrefreshtemplates

[64]: #urlimagetemplate

[65]: #parameters-20

[66]: #useconfig

[67]: #parameters-21

[68]: #handlecreate

[69]: #namebutton

[70]: #masivosprovider

[71]: #parameters-22

[72]: #usesignin

[73]: #handlepasswordchange

[74]: #parameters-23

[75]: #toggleshowpassword

[76]: #handleresetpassword

[77]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[78]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[79]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[80]: https://developer.mozilla.org/docs/Web/API/Event

[81]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[82]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined
