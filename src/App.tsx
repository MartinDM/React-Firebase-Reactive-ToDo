import {
  createBrowserRouter, Route, RouterProvider, createRoutesFromElements
} from "react-router-dom";

import { Login } from './pages/Login'
import { Home } from './pages/Home'

import RootLayout from "./layouts/RootLayout";
export const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}