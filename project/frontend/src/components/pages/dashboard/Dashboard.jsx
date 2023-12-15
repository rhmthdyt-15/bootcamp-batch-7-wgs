import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardStatsGrid from './DashboardStatsGrid'
import TransactionChart from './TransactionChart'
import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrders from './RecentOrders'
import PopularProducts from './PopularProducts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError, navigate])

    return (
        <div className="flex flex-col gap-4">
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
