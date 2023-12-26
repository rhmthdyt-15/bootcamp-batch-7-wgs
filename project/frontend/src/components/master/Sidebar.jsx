import React from 'react'
import { FcBullish } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import {
    HiOutlineLogout,
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi'

import { SiMoneygram } from 'react-icons/si'
import { FaCube, FaCubes, FaMoneyBill, FaRegIdCard, FaTruck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'
import axios from 'axios'

const linkClasses =
    'flex items-center gap-2 font-light px-2 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { user } = useSelector((state) => state.auth)

    const logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-100 text-lg">POS</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                <Link
                    to="/"
                    className={classNames(
                        pathname === '/' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineViewGrid />
                    </span>
                    Dashboard
                </Link>
                <Link
                    to="/category"
                    className={classNames(
                        pathname === '/category' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <FaCubes />
                    </span>
                    Category
                </Link>
                <Link
                    to="/products"
                    className={classNames(
                        pathname === '/products' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <FaCube />
                    </span>
                    Product
                </Link>
                <Link
                    to="/members"
                    className={classNames(
                        pathname === '/members' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <FaRegIdCard />
                    </span>
                    Member
                </Link>
                <Link
                    to="/suppliers"
                    className={classNames(
                        pathname === '/suppliers' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <FaTruck />
                    </span>
                    Supplier
                </Link>
                <Link
                    to="/pengeluaran"
                    className={classNames(
                        pathname === '/pengeluaran' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <FaMoneyBill />
                    </span>
                    Pengeluaran
                </Link>
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                <Link
                    to="/settings"
                    className={classNames(
                        pathname === '/settings' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineCog />
                    </span>
                    Settings
                </Link>
                <Link
                    to="/support"
                    className={classNames(
                        pathname === '/support' ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                        linkClasses
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineQuestionMarkCircle />
                    </span>
                    Help & Support
                </Link>
                <div className={classNames('text-red-500', linkClasses)} onDoubleClick={logout}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}
