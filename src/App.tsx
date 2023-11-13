import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { App } from 'antd'

import { PrivateRoute } from './routes/PrivateRoute'
import { PublicRoute } from './routes/PublicRoute'
import { useAppSelector } from './store/storeHooks'
import './App.css'

import { selectIsAuthorized } from './store/slices/authSlice'
import { Login, Dashboard, Settings, Course } from './pages'
import { useCurrentUserQuery } from './api/auth'

export default () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  useCurrentUserQuery();

  return (
    <App notification={{ placement: 'topRight' }}>
      <Suspense>
        <Routes>
          <Route path='/' element={<PrivateRoute isAuth={isAuth} />}>
            <Route path='/' element={<Course />} />
            <Route path='/db' element={<Dashboard />} />
            <Route path='/course' element={<Course />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
          <Route path='/' element={<PublicRoute isAuth={isAuth} />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </App>
  )

}
