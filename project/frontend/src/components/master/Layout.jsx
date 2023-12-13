import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="p-4">
                <div className="bg-teal-200">header</div>
                <div>{<Outlet />}</div>
                <p>Footer</p>
            </div>
        </div>
    )
}

export default Layout
