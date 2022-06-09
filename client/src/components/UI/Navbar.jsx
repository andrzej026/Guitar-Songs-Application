import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setIsAuth, setUser } from '../../features/user/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.user.isAuth)
    const user = useSelector((state) => state.user.user)

    const logout = (event) => {
        event.preventDefault()
        dispatch(setIsAuth())
        dispatch(setUser({}))
        localStorage.removeItem('token')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-4">
            <div className="container-fluid px-4 py-0">
                <Link className="navbar-brand mb-0 h1" to="/main">
                    Guitar Songs App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/personal">
                                Personal
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">
                                Create
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <span className="navbar-text">
                            {user.login ? (
                                `Welcome, ${user.login}!`
                            ) : (
                                <Link className="text-decoration-none" to="/join">
                                    Create an account
                                </Link>
                            )}
                        </span>
                        {isAuth ? (
                            <button
                                className="btn btn-dark ms-4"
                                type="submit"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="btn btn-dark ms-4" type="submit">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
