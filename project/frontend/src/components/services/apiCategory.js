import axios from 'axios'
import { showErrorAlert } from '../master/SweetAlertUtil'

const BASE_URL = 'http://localhost:5000'

export const getCategoryList = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/category`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching kategori list:', error)
        throw error
    }
}
