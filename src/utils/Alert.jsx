import Swal from 'sweetalert2'

export const Alert = () => {
  Swal.fire({
    title: "Credentials Error",
    text: "Enter valid credentials",
    confirmButtonText: "Accept",
    width: "400px",
    timer: 10000,
    timerProgressBar: true,
  })
}
