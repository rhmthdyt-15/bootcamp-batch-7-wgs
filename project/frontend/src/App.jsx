import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/master/Layout'
import Dashboard from './components/pages/dashboard/Dashboard'
import Product from './components/pages/product'
import Login from './components/pages/auth/Login'
import Category from './components/pages/category'
import AddCategory from './components/pages/category/AddCategory'
import EditCategory from './components/pages/category/EditCategory'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Product />} />
                    <Route path="category" element={<Category />} />
                    <Route path="category/add" element={<AddCategory />} />
                    <Route path="category/edit/:id" element={<EditCategory />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
