import Swal from 'sweetalert2';

/**
 * Muestra un modal con una notificación tipo toast.
 *
 * @param {string} mode - El modo del toast (por ejemplo, "success", "error", "warning").
 * @param {string} mensaje - El mensaje que se mostrará en el toast.
 */
const Modal = (mode , mensaje) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: mode,
        iconColor: "##0d6efd",
        title: mensaje
      });
}

/**
 * Crea una notificación tipo toast con un modo y mensaje dados.
 *
 * @param {string} mode - El modo de la notificación toast (por ejemplo, "success", "error", "warning").
 * @param {string} mensaje - El mensaje que se mostrará en la notificación toast.
 */
const Toast = (mode, mensaje) => {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
  });
  Toast.fire({
  text: mensaje,
  icon: mode,
  });
}

export { Modal, Toast }