import { Route, Routes } from "react-router-dom"
import { Login } from "../page/Login"
import { Register } from "../page/Register"
import { Dashboard } from "../page/dashboard"
import { Schedules } from "../page/schedules"
import { PrivateRoute } from "./PrivateRouter"
import { EditProfile } from "../page/editProfile"

export const RouteApp = () => {
  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path='/schedules'
        element={
          <PrivateRoute>
            <Schedules />
          </PrivateRoute>
        }
      />
      <Route path='/edit-profile'
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>

  )
}