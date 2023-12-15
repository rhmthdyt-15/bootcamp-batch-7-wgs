import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi'

import { FaCubes } from 'react-icons/fa'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        Label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'category',
        Label: 'Category',
        path: '/category',
        icon: <FaCubes />
    },
    {
        key: 'products',
        Label: 'Products',
        path: '/products',
        icon: <HiOutlineCube />
    },
    {
        key: 'orders',
        Label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        Label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'transactions',
        Label: 'Transactions',
        path: '/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'messages',
        Label: 'Messages',
        path: '/messages',
        icon: <HiOutlineAnnotation />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        Label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        Label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
