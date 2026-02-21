import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <header className="bg-white w-full fixed shadow-md p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-sm md:text-2xl font-bold text-gray-800 hover:cursor-pointer"
                onClick={() => navigate("/")}
            >
                Inventory
            </h1>

            <div className="flex justify-end">
                {!isAuthenticated &&
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 text-sm px-1 py-2 rounded-lg transition hover:cursor-pointer"
                    >
                        Login
                    </button>
                }

                {isAuthenticated && (
                    <>
                        <button
                            onClick={() => navigate("/create")}
                            className="text-blue-600 text-sm px-1 py-2 rounded hover:cursor-pointer"
                        >
                            Add Product
                        </button>

                        <button
                            onClick={logout}
                            className="text-red-600 text-sm px-1 py-2 rounded-lg transition hover:cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                )
                }
            </div>
        </header>
    )
}

export default Header
