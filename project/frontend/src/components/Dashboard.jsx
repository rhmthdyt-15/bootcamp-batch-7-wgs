import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <p>This is Dashboard</p>{' '}
            <Link to="/products" className="underline">
                Go to product
            </Link>
        </div>
    )
}

export default Dashboard
