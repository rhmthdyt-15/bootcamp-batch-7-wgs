import Swal from 'sweetalert2'

export const showSuccessAlert = (message) => {
    Swal.fire({
        title: 'Sukses!',
        text: message,
        icon: 'success'
    })
}

export const showErrorAlert = (message) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error'
    })
}

export const showConfirmationAlert = async (title, text) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    })
}
