import Swal from 'sweetalert2';

/**
 * Display a modal with a toast notification.
 *
 * @param {string} mode - The mode of the toast (e.g., "success", "error", "warning").
 * @param {string} mensaje - The message to be displayed in the toast.
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
 * Creates a toast notification with a given mode and message.
 *
 * @param {string} mode - The mode of the toast notification (e.g. "success", "error", "warning").
 * @param {string} mensaje - The message to be displayed in the toast notification.
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