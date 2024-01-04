import React from 'react'
import Swal from 'sweetalert2'
import { TailSpin } from 'react-loader-spinner'

const showLoadingModal = () => {
    Swal.fire({
        title: 'Loading...',
        html: <TailSpin type="Puff" color="#00BFFF" height={80} width={80} />,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    })
}

const ExampleComponent = () => (
    <div>
        <h1>Your Content Here</h1>
        <button onClick={showLoadingModal}>Show Loading Modal</button>
    </div>
)

export default ExampleComponent
