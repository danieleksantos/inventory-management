import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  customClass: {
    popup: 'rounded-2xl border border-inventory-100 shadow-xl bg-white',
    title: 'text-sm font-bold text-inventory-800',
  },
});
