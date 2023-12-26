import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import DashboardStatsGrid from './DashboardStatsGrid'
import TransactionChart from './TransactionChart'
import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrders from './RecentOrders'
import PopularProducts from './PopularProducts'
import axios from 'axios'
import { useAuth } from '../../auth/useAuth'

function Dashboard() {
    const { name, token, expire, axiosJWT } = useAuth()

    return (
        <div className="flex flex-col gap-4" token={token}>
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}

export default Dashboard
