import React, { useEffect } from 'react'
import ListCategory from './ListCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'

function Category() {
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
            <ListCategory />
        </div>
    )
}

export default Category
