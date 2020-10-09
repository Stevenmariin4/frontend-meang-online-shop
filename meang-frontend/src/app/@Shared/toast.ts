import { Types_Alert } from './values.config';
import Swal from 'sweetalert2';

export function basicAlert(
  title: string,
  text: string,
  btn: string,
  icon: Types_Alert
) {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: btn,
    toast: true,
    position: 'bottom',
    confirmButtonColor: '#f51167',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}
