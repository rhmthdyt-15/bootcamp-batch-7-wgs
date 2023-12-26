import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client' // Perubahan di sini
import Barcode from 'react-barcode'

const BarcodeComponent = ({ value }) => {
    const rootRef = useRef(null)

    useEffect(() => {
        const root = rootRef.current
        const barcode = <Barcode value={value} />

        const unmount = () => ReactDOM.unmountComponentAtNode(root)
        createRoot(root).render(barcode) // Perubahan di sini

        return unmount
    }, [value])

    return <div ref={rootRef} />
}

export default BarcodeComponent
