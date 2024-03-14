import { Link, Outlet } from 'react-router-dom'
import './index.scss'
import flame from '../assets/flame.png'
export default function RootLayout() {
  return (
    <>
      <img src={flame} alt="Firebase Todos" />
      <main className="app">
        <Outlet />
      </main>
      <div className="footer">
        <p>
          A React project with Firebase by{' '}
          <Link className="font-bold" to="http://martindm.uk">
            Martin
          </Link>
        </p>
        <p>
          Check it out on{' '}
          <Link
            className="font-bold"
            to="https://github.com/MartinDM/React-Firebase-Reactive-ToDo"
          >
            Github
          </Link>
        </p>
      </div>
    </>
  )
}
