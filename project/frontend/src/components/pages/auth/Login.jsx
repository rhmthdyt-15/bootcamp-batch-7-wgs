import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../features/authSlice'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user || isSuccess) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault()
        dispatch(LoginUser({ email, password }))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={Auth}>
                    {isError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-neutral-700 p-4" role="alert">
                            <p>{message}</p>
                        </div>
                    )}
                    <div className="mb-4 mt-3">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
