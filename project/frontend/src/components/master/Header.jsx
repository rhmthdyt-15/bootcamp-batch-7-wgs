import React, { Fragment } from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import { Menu, Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate('/login')
    }
    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
                />
            </div>
            <div className="flex items-center gap-2 mr-2">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-100',
                                    'p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineChatAlt fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 transform translate-y-1"
                                enterTo="opacity-100 transform translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 transform translate-y-0"
                                leaveTo="opacity-0 transform translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2">
                                        <strong className="text-gray-700 font-medium">Messages</strong>
                                        <div className="mt-2 py-1 text-sm">This is the messages panel</div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-100',
                                    'p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineBell fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 transform translate-y-1"
                                enterTo="opacity-100 transform translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 transform translate-y-0"
                                leaveTo="opacity-0 transform translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2">
                                        <strong className="text-gray-700 font-medium">Notification</strong>
                                        <div className="mt-2 py-1 text-sm">This is the notification panel</div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Menu as="div" className="relative">
                    <div className="inline-flex">
                        <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:right-2 focus:ring-neutral-400">
                            <span className="sr-only">Open user menu</span>
                            <div
                                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp')"
                                }}
                            >
                                <div className="sr-only">John Doe</div>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 ring-black bg-white rig-1 ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={() => navigate('/profile')}
                                    >
                                        Your Profile
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={() => navigate('/settings')}
                                    >
                                        Settings
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={logout}
                                    >
                                        Logout
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default Header
