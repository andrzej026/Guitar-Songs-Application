import { host, authHost } from './api'
import jwt_decode from 'jwt-decode'

export const singupAPI = async (email, login, password, confirmPassword) => {
    const { data } = await host.post('api/users/singup', {
        email,
        login,
        password,
        confirmPassword,
        role: 'USER',
    })
    localStorage.setItem('token', data.token)
    return [data.message, jwt_decode(data.token)]
}

export const loginAPI = async (login, password) => {
    const { data } = await host.post('api/users/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const loginEmailAPI = async (email, password) => {
    const { data } = await host.post('api/users/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkAuth = async () => {
    const { data } = await authHost.get('api/users/checkAuth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
