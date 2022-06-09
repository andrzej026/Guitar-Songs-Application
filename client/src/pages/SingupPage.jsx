import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { singupAPI } from '../api/userAPI'

const SingupPage = () => {
    const [notice, setNotice] = useState('')
    const [formSingup, setFormSingup] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    })

    const singup = async (event) => {
        event.preventDefault()
        try {
            const response = await singupAPI(
                formSingup.email,
                formSingup.login,
                formSingup.password,
                formSingup.confirmPassword
            )
            setNotice(response[0])
        } catch (error) {
            const errors = error.response.data.message
            if (Array.isArray(errors)) {
                errors.map((error) => setNotice(error.msg))
            } else {
                setNotice(errors)
            }
        }
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <h3>Create your account</h3>
                <div className="card-body">
                    <p>{notice}</p>
                    <form>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInputEmail"
                                placeholder="E-mail"
                                value={formSingup.email}
                                onChange={(event) =>
                                    setFormSingup({
                                        ...formSingup,
                                        email: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInputLogin"
                                placeholder="Login"
                                value={formSingup.login}
                                onChange={(event) =>
                                    setFormSingup({
                                        ...formSingup,
                                        login: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingInput">Login</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={formSingup.password}
                                onChange={(event) =>
                                    setFormSingup({
                                        ...formSingup,
                                        password: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingConfirmPassword"
                                placeholder="Confirm Password"
                                value={formSingup.confirmPassword}
                                onChange={(event) =>
                                    setFormSingup({
                                        ...formSingup,
                                        confirmPassword: event.target.value,
                                    })
                                }
                            />
                            <label htmlFor="floatingConfirmPassword">
                                Confirm Password
                            </label>
                        </div>
                        <button
                            className="btn btn-primary"
                            disabled={
                                !formSingup.email.trim() ||
                                !formSingup.login.trim() ||
                                !formSingup.password ||
                                !formSingup.confirmPassword
                            }
                            onClick={singup}
                        >
                            Sing Up
                        </button>
                    </form>
                    <p className="text-start">
                        Have an account? <Link to="/login">Log in!</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingupPage
