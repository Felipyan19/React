# Mass-WhatsApp: Bulk WhatsApp Messaging Platform

Welcome to Mass-WhatsApp, a powerful web platform built with Vite and React that empowers you to send messages massively through WhatsApp. This application simplifies the messaging process with meta integrations and provides robust features for managing campaigns, users, and templates.

## Key Features

- **Bulk WhatsApp Messaging**: Efficiently send messages to multiple recipients through WhatsApp.

- **Secure Authentication**: Log in securely and easily with password recovery options to maintain your account's privacy.

- **Campaign Management**: Visualize and manage active campaigns, obtaining detailed information about their status and configuration.

- **Custom Templates**: Utilize meta integrations to access custom templates, simplifying the message creation process.

- **Message History**: Explore a detailed history of sent messages, including information about the corresponding numbers.

- **Flexible Configuration**: Easily adjust and modify campaign and user settings from the configuration page.

## Quick Guide

### Login

1. Access the platform through the login process.
2. Use password recovery options if needed.

### Dashboard

1. Navigate the menu to access different sections: Campaigns, Messages, Configuration, etc.
2. View and manage your active campaigns.

### Message Sending

1. Create bulk messages using custom templates.
2. Track sent messages and associated numbers.

### Configuration

1. Adjust campaign and user settings according to your needs.
2. Add and modify campaigns to tailor them to your marketing strategy.

Start sending WhatsApp messages massively with Mass-WhatsApp effectively!

## Developer

This application has been developed using Vite and React. You can check the source code and contribute to the development on our GitHub repository.

[GitHub Repository](#link-to-your-github-repo)

---

**Note:** Replace "#link-to-your-github-repo" with the actual link to your GitHub repository.

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
*   [Modal][13]
    *   [Parameters][14]
*   [Toast][15]
    *   [Parameters][16]
*   [useMyNotification][17]
*   [closeToast][18]
    *   [Parameters][19]
*   [closeToast][20]
*   [closeToast][21]
*   [handleOutsideClick][22]
    *   [Parameters][23]
*   [useResetPassword][24]
    *   [Parameters][25]
*   [sendResetPassword][26]
*   [handleEmailChange][27]
    *   [Parameters][28]
*   [handleEmailChange][29]
    *   [Parameters][30]
*   [useNotificationDetails][31]
*   [startStop][32]
*   [clickNumberFail][33]
*   [useNabvar][34]
*   [handleScroll][35]
    *   [Parameters][36]
*   [toast][37]
*   [restore][38]
    *   [Parameters][39]
*   [useSendExample][40]
*   [handeSend][41]
    *   [Parameters][42]
*   [handeSend][43]
    *   [Parameters][44]
*   [sendExampleData][45]
*   [handleNumeroEjemplo][46]
    *   [Parameters][47]
*   [handleSendExample][48]
*   [useSendExcel][49]
*   [useEffect][50]
*   [useEffect][51]
*   [useEffect][52]
*   [handleFileChange][53]
    *   [Parameters][54]
*   [onerror][55]
    *   [Parameters][56]
*   [handleBucleSend][57]
*   [sendExcelData][58]
*   [handleclickSendExcel][59]
*   [useTemplate][60]
*   [plantillaSelect][61]
    *   [Parameters][62]
*   [newTemplates][63]
    *   [Parameters][64]
*   [clickRefreshTemplates][65]
*   [urlImageTemplate][66]
    *   [Parameters][67]
*   [useConfig][68]
    *   [Parameters][69]
*   [handleCreate][70]
*   [nameButton][71]
*   [MasivosProvider][72]
    *   [Parameters][73]
*   [useSignIn][74]
*   [handlePasswordChange][75]
    *   [Parameters][76]
*   [toggleShowPassword][77]
*   [handleResetPassword][78]


## useFormConfig

Generate the form configuration for the useForm hook.

### Parameters

*   `options` **[Object][79]** The options for the form configuration.

    *   `options.tokenUser` **[string][80]** The token of the user.
    *   `options.title` **[string][80]** The title of the form.
    *   `options.api` **[Function][81]** The API function to be called.
    *   `options.closeToast` **[Function][81]** The function to close the toast.

Returns **[Object][79]** The form configuration object.

## handleUserSelection

Handles the user selection event.

### Parameters

*   `e` **[Event][82]** The event object representing the user selection.

Returns **void** This function does not return anything.

## handleCampañaSelection

Handles the selection of a campaign.

### Parameters

*   `e` **[Event][82]** The event object representing the selection event.

Returns **void** No return value.

## handleSubmit

Handles the form submission.

### Parameters

*   `e` **[Event][82]** The event object.

Returns **[Promise][83]\<void>** Returns a promise that resolves to undefined.

## handleSubmit

Handles the form submission asynchronously.

### Parameters

*   `e` **[Event][82]** The form submission event.

## handleSubmit

Submits the form when triggered by an event.

### Parameters

*   `e` **[Event][82]** The event that triggered the form submission.

Returns **void** This function does not return a value.

## Modal

Display a modal with a toast notification.

### Parameters

*   `mode` **[string][80]** The mode of the toast (e.g., "success", "error", "warning").
*   `mensaje` **[string][80]** The message to be displayed in the toast.

## Toast

Creates a toast notification with a given mode and message.

### Parameters

*   `mode` **[string][80]** The mode of the toast notification (e.g. "success", "error", "warning").
*   `mensaje` **[string][80]** The message to be displayed in the toast notification.

## useMyNotification

Function to use the notification.

Returns **[object][79]** An object with the closeToast function

## closeToast

Closes the toast notification.

### Parameters

*   `null-null` **none** This function does not take any parameters.

Returns **none** This function does not return any value.

## closeToast

Closes the toast and performs additional actions.

Returns **[undefined][84]** This function does not return a value.

## closeToast

Closes the toast.

Returns **void**&#x20;

## handleOutsideClick

Handles click events that occur outside of the toast element.

### Parameters

*   `e` **[Event][82]** The click event object.

## useResetPassword

Generates the function comment for the given function body in a markdown code block
with the correct language syntax.

### Parameters

*   `paramsJson` **[Object][79]** an object containing the parameters for the function

    *   `paramsJson.paramsJson` &#x20;

Returns **[Object][79]** an object containing the email, closeToast, sendResetPassword,
handleEmailChange, showPasword, and handleSubmit functions

## sendResetPassword

Sends a reset password email.

Returns **[Promise][83]** A promise that resolves when the email is sent.

## handleEmailChange

Handles the change event of the email input field.

### Parameters

*   `event` **[Event][82]** The event object representing the change event.

Returns **void** This function does not return anything.

## handleEmailChange

Handles the change event for the email input field.

### Parameters

*   `e` **[Event][82]** The change event object.

Returns **void** This function does not return anything.

## useNotificationDetails

Generates a custom hook that provides notification details and functionality.

Returns **[object][79]** An object containing the following functions:*   closeToast: A function that closes the notification toast and updates related state.
*   startStop: A function that toggles the running state of the notifications.
*   clickNumberFail: A function that toggles the display of failed notification count.

## startStop

Toggles the value of `isRuning`.

Returns **void** No return value.

## clickNumberFail

Toggles the value of `numberFail` and updates the state.

Returns **[undefined][84]** No return value.

## useNabvar

Returns an object containing the user's name, whether the page is scrolled, and two functions for displaying a toast notification and restoring session data.

Returns **[object][79]** An object with the following properties:
\- name: The user's name.
\- isScrolled: A boolean indicating whether the page is scrolled.
\- toast: A function for displaying a toast notification.
\- restore: A function for restoring session data.

## handleScroll

Handles the scroll event.

### Parameters

*   `paramName` **type** description of parameter

Returns **type** description of return value

## toast

A function to display a toast notification.

Returns **void** This function does not return a value.

## restore

Restores the state of the context and displays an info modal for a closed session.

### Parameters

*   `paramName` **type** description of parameter

Returns **type** description of return value

## useSendExample

Generates a function comment for the given function body.

Returns **[Object][79]** An object containing two functions: `handleNumeroEjemplo` and `handleSendExample`.

## handeSend

Handles the send operation.

### Parameters

*   `phone` **[string][80]** The phone number to send the message to.

Returns **[Promise][83]\<any>** A promise that resolves to the result of the send operation.

## handeSend

Handles sending data based on certain conditions.

### Parameters

*   `item` **[Object][79]** the item to be sent

Returns **[Promise][83]\<any>** a promise that resolves with the result of the sending operation

## sendExampleData

Sends example data asynchronously.

Returns **[Promise][83]\<void>** A promise that resolves when the data is sent.

## handleNumeroEjemplo

A description of the entire function.

### Parameters

*   `e` **type** the event object

Returns **type** undefined

## handleSendExample

Executes the handleSendExample function.

Returns **void** This function does not return a value.

## useSendExcel

Generates a function comment for the given function body in a markdown code block with the correct language syntax.

Returns **[object][79]** An object containing the following functions:*   handleFileChange: A function that handles the file change event.
*   handleclickSendExcel: A function that handles the click event to send the Excel data.

## useEffect

Tracks the `tokenUser` state and updates `currentTokenUser`.

Returns **void**&#x20;

## useEffect

Monitors the `isRefresh` state and controls the sending process
based on `isRefresh` and comparison between `procesado` and
`excelLength`.

Returns **void**&#x20;

## useEffect

Observes the `isRuning` state and triggers `handleBucleSend` when
`isRuning` is false.

Returns **void**&#x20;

## handleFileChange

Handles the file change event.

### Parameters

*   `e` **[object][79]** The event object.

Returns **void** No return value.

## onerror

Handles the error when the file could not be read.

### Parameters

*   `event` **[Event][82]** The event object.

Returns **void** No return value.

## handleBucleSend

Handles the sending of data in a loop.

Returns **[Promise][83]\<void>** A promise that resolves when the sending of data is completed.

## sendExcelData

Sends Excel data.

Returns **[Promise][83]\<void>** A promise that resolves when the data has been sent successfully.

## handleclickSendExcel

Handles the click event for sending Excel data.

Returns **[undefined][84]** No return value.

## useTemplate

Generates the function comment for the useTemplate function.

Returns **[object][79]** An object containing the following functions:*   plantillaSelect: A function that handles the selection of a template.
*   clickRefreshTemplates: A function that refreshes the templates.
*   urlImageTemplate: A function that sets the URL of the template image.

## plantillaSelect

Generate the function comment for the given function body.

### Parameters

*   `e` **[Event][82]** The event object.

Returns **void** This function does not return anything.

## newTemplates

Generates new templates asynchronously.

### Parameters

*   `tokenUser` **type** the user token
*   `homeDataClientId` **type** the ID of the home data client

Returns **type** none

## clickRefreshTemplates

Clicks the "Refresh Templates" button and performs the following actions:

1.  Calls the "refreshTemplates" function with the "tokenUser" and "homeDataClient?.id" parameters.
2.  Calls the "newTemplates" function.
3.  Displays a success message using Swal.fire.

Returns **[Promise][83]\<void>** A promise that resolves when all the actions are complete.

## urlImageTemplate

Sets the url template based on the target value.

### Parameters

*   `e` **[Event][82]** The event object containing the target value.

Returns **void** This function does not return a value.

## useConfig

Generates a custom hook that manages the configuration state for a specific title.

### Parameters

*   `config` **[Object][79]** The configuration object.

    *   `config.title` **[string][80]** The title of the configuration.

Returns **[Object][79]** An object containing the state and functions for managing the configuration.

## handleCreate

Handle the create operation.

Returns **void** There is no return value.

## nameButton

Returns the label for the button based on the value of the 'title' variable.

Returns **[string][80]** The label for the button.

## MasivosProvider

Export a provider component that wraps the given children
and provides a context for managing state and data related to a Masivos application.

### Parameters

*   `props` **[Object][79]** The component props.

    *   `props.children` **ReactNode** The children components to be wrapped.

Returns **ReactElement** The wrapped component.

## useSignIn

Generates a custom hook for handling sign-in functionality.

Returns **[Object][79]** An object containing various functions and state variables related to sign-in.

## handlePasswordChange

Handles the change event of the password input.

### Parameters

*   `e` **[Event][82]** The change event object.

## toggleShowPassword

Toggles the visibility of the password.

Returns **void**&#x20;

## handleResetPassword

Reset the user's password.

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

[13]: #modal

[14]: #parameters-6

[15]: #toast

[16]: #parameters-7

[17]: #usemynotification

[18]: #closetoast

[19]: #parameters-8

[20]: #closetoast-1

[21]: #closetoast-2

[22]: #handleoutsideclick

[23]: #parameters-9

[24]: #useresetpassword

[25]: #parameters-10

[26]: #sendresetpassword

[27]: #handleemailchange

[28]: #parameters-11

[29]: #handleemailchange-1

[30]: #parameters-12

[31]: #usenotificationdetails

[32]: #startstop

[33]: #clicknumberfail

[34]: #usenabvar

[35]: #handlescroll

[36]: #parameters-13

[37]: #toast-1

[38]: #restore

[39]: #parameters-14

[40]: #usesendexample

[41]: #handesend

[42]: #parameters-15

[43]: #handesend-1

[44]: #parameters-16

[45]: #sendexampledata

[46]: #handlenumeroejemplo

[47]: #parameters-17

[48]: #handlesendexample

[49]: #usesendexcel

[50]: #useeffect

[51]: #useeffect-1

[52]: #useeffect-2

[53]: #handlefilechange

[54]: #parameters-18

[55]: #onerror

[56]: #parameters-19

[57]: #handlebuclesend

[58]: #sendexceldata

[59]: #handleclicksendexcel

[60]: #usetemplate

[61]: #plantillaselect

[62]: #parameters-20

[63]: #newtemplates

[64]: #parameters-21

[65]: #clickrefreshtemplates

[66]: #urlimagetemplate

[67]: #parameters-22

[68]: #useconfig

[69]: #parameters-23

[70]: #handlecreate

[71]: #namebutton

[72]: #masivosprovider

[73]: #parameters-24

[74]: #usesignin

[75]: #handlepasswordchange

[76]: #parameters-25

[77]: #toggleshowpassword

[78]: #handleresetpassword

[79]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[80]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[81]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[82]: https://developer.mozilla.org/docs/Web/API/Event

[83]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[84]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined
