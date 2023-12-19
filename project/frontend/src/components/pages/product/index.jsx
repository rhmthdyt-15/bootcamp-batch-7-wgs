import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'
import ListProduct from './ListProduct'

function Product() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
        if (user && user.role !== 'admin') {
            navigate('/')
        }
    }, [isError, user, navigate])
    return (
        <div className="flex flex-row w-full">
            <ListProduct />
        </div>
    )
}

export default Product
