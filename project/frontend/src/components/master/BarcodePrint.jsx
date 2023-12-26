import React from 'react'
import Barcode from 'react-barcode'

const BarcodePrint = ({ code }) => {
    return (
        <div>
            <strong>Kode Produk:</strong> {code}
            <Barcode value={code} />
        </div>
    )
}

export default BarcodePrint
