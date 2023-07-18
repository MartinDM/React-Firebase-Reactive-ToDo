import { Outlet } from "react-router-dom";
import "./index.scss";
import flame from '../assets/flame.png'

export default function RootLayout() {
  return (
    <>
      <img src={flame} alt='Firebase Todos' />
      <main className="app">
        <Outlet />
      </main>
    </>
  )
}
