import AppRouter from './components/AppRouter'
import Navbar from './components/UI/Navbar'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsAuth, setUser } from './features/user/userSlice'
import { checkAuth } from './api/userAPI'
import './App.css'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        checkAuth().then((data) => {
            console.log(data)
            dispatch(setUser(data))
            dispatch(setIsAuth(true))
        })
    }, [])

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <AppRouter />
            </div>
        </BrowserRouter>
    )
}

export default App
