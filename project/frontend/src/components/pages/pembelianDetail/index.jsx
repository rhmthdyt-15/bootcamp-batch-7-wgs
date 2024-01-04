import React from 'react'
import { useAuth } from '../../auth/useAuth'
import Checkout from './Checkout'

function PembeianDetail() {
    const { token } = useAuth()
    return (
        <div className="flex flex-row w-full">
            <Checkout token={token} />
        </div>
    )
}

export default PembeianDetail
