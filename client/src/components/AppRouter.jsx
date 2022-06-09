import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'

const AppRouter = () => {
    const isAuth = useSelector((state) => state.user.isAuth)
    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
        </Routes>
    )
}

export default AppRouter

// export const useRoutes = (isAuth) => {
//     if (isAuth) {
//         return (
//             <Routes>
//                 <Route path="/main" element={<MainPage />} />
//                 <Route path="/personal" element={<PersonalPage />} />
//                 <Route path="/create" element={<SongPageCreate />} />
//                 <Route path="/song/:id" element={<SongPageView />} />
//                 <Route path="*" element={<MainPage />} />
//             </Routes>
//         )
//     }
//     return (
//         <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/main" element={<MainPage />} />
//             <Route path="/song/:id" element={<SongPageView />} />
//             <Route path="*" element={<MainPage />} />
//         </Routes>
//     )

// const isAuth = useSelector((state) => state.user.isAuth)
// return isAuth ? (
//     <Routes>
//         {privateRoutes.map((route) => (
//             <Route key={route.path} path={route.path} element={<route.element />} />
//         ))}
//     </Routes>
// ) : (
//     <Routes>
//         {publicRoutes.map((route) => (
//             <Route key={route.path} path={route.path} element={<route.element />} />
//         ))}
//     </Routes>
// )
