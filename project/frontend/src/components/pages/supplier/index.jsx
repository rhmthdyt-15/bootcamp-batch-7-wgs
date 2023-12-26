import React from 'react'
import { useAuth } from '../../auth/useAuth'
import List from './List'

function Supplier() {
    const { token } = useAuth()
    return (
        <div className="flex flex-row w-full">
            <List token={token} />
        </div>
    )
}

export default Supplier
