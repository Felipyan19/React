import Swal from 'sweetalert2';
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

export { Modal }