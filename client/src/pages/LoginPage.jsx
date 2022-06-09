import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAPI, loginEmailAPI } from '../api/userAPI'
import { setIsAuth, setUser } from '../features/user/userSlice'
const validator = require('email-validator')

const LoginPage = () => {
    const dispatch = useDispatch()
    const [formLogin, setFormLogin] = useState({ data: '', password: '' })
    const [error, setError] = useState('')

    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            if (validator.validate(formLogin.data)) {
                const response = await loginEmailAPI(formLogin.data, formLogin.password)
                dispatch(setUser(response))
                dispatch(setIsAuth())
            } else {
                const response = await loginAPI(formLogin.data, formLogin.password)
                dispatch(setUser(response))
                dispatch(setIsAuth())
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <h3>Login</h3>
                <p>{error}</p>
                <div className="card-body">
                    <form onSubmit={loginHandler}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Login"
                                value={formLogin.login}
                                onChange={(event) =>
                                    setFormLogin({
                                        ...formLogin,
                                        data: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingInput">Email or Login</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={formLogin.password}
                                onChange={(event) =>
                                    setFormLogin({
                                        ...formLogin,
                                        password: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button
                            className="btn btn-primary"
                            disabled={!formLogin.data.trim() || !formLogin.password}
                        >
                            Let Me In!
                        </button>
                    </form>
                    <p className="text-start">
                        Don`t have a profile? <Link to="/join">Sign up!</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
