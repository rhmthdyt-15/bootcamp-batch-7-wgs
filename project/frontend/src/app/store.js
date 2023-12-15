import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../components/features/authSlice'

export default configureStore({
    reducer: {
        auth: authReducer
    }
})
