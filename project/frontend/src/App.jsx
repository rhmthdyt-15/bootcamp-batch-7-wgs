import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/master/Layout'
import Dashboard from './components/pages/dashboard/Dashboard'
import Login from './components/pages/auth/Login'
import Category from './components/pages/category'
import AddCategory from './components/pages/category/AddCategory'
import EditCategory from './components/pages/category/EditCategory'
import Product from './components/pages/product'
import AddProduct from './components/pages/product/AddProduct'
import DetailProduct from './components/pages/product/DetailProduct'
import EditProduct from './components/pages/product/EditProduct'
import Member from './components/pages/member'
import AddMember from './components/pages/member/AddMember'
import EditMember from './components/pages/member/EditMember'
import BarcodeProduct from './components/pages/product/BarcodeProduct'
import Supplier from './components/pages/supplier'
import AddSupplier from './components/pages/supplier/AddSupplier'
import EditSupplier from './components/pages/supplier/EditSupplier'
import Pengeluaran from './components/pages/pengeluaran'
import AddPengeluaran from './components/pages/pengeluaran/AddPengeluaran'
import EditPengeluaran from './components/pages/pengeluaran/EditPengeluaran'
import Pembelian from './components/pages/pembelian'
import PilihSupplier from './components/pages/pembelian/PilihSupplier'
import PembeianDetail from './components/pages/pembelianDetail'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />

                    {/* category */}
                    <Route path="/category" element={<Category />} />
                    <Route path="/category/add" element={<AddCategory />} />
                    <Route path="/category/edit/:id" element={<EditCategory />} />

                    {/* Product */}
                    <Route path="products" element={<Product />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="/products/detail/:id" element={<DetailProduct />} />
                    <Route path="/products/edit/:id" element={<EditProduct />} />
                    <Route path="/products/barcode" element={<BarcodeProduct />} />

                    {/* Member */}
                    <Route path="/members" element={<Member />} />
                    <Route path="/members/add" element={<AddMember />} />
                    <Route path="/members/edit/:id" element={<EditMember />} />

                    {/* Supplier */}
                    <Route path="/suppliers" element={<Supplier />} />
                    <Route path="/suppliers/add" element={<AddSupplier />} />
                    <Route path="/suppliers/edit/:id" element={<EditSupplier />} />

                    {/* Pengeluaran */}
                    <Route path="/pengeluaran" element={<Pengeluaran />} />
                    <Route path="/pengeluaran/add" element={<AddPengeluaran />} />
                    <Route path="/pengeluaran/edit/:id" element={<EditPengeluaran />} />

                    {/* Pembelian */}
                    <Route path="/pembelian" element={<Pembelian />} />
                    <Route path="/pembelian/pilih_supplier" element={<PilihSupplier />} />
                    <Route path="/pembelian/pilih_supplier/create" element={<PembeianDetail />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
