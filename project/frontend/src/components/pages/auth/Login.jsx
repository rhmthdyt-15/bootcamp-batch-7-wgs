import React from 'react'

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input type="text" id="username" name="username" className="w-full border rounded-md p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input type="password" id="password" name="password" className="w-full border rounded-md p-2" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
