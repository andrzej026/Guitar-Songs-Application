import LoginPage from './pages/LoginPage'
import SingupPage from './pages/SingupPage'
import MainPage from './pages/MainPage'
import PersonalPage from './pages/PersonalPage'
import SongPageCreate from './pages/SongPageCreate'
import SongPageView from './pages/SongPageView'

export const publicRoutes = [
    { path: '/join', element: SingupPage },
    { path: '/login', element: LoginPage },
    { path: '/main', element: MainPage },
    { path: '/song/:id', element: SongPageView },
    { path: '*', element: LoginPage },
]

export const privateRoutes = [
    { path: '/main', element: MainPage },
    { path: '/personal', element: PersonalPage },
    { path: '/create', element: SongPageCreate },
    { path: '/song/:id', element: SongPageView },
    { path: '*', element: MainPage },
]
