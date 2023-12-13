import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/master/Layout'
import Dashboard from './components/Dashboard'
import Product from './components/pages/product'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/products" element={<Product />} />
                    </Route>
                    <Route path="/login" element={<div>This is Login</div>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
