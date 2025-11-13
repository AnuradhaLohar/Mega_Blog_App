
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import './App.css'
import { Footer, Header } from './component'
import { Outlet } from 'react-router-dom'
import conf from "./config/config";


function App() {
  const [loading, setLoding] = useState(true)
  const dispatch = useDispatch()

  // console.log("Appwrite Config:", conf);


  useEffect(() => {

    // const usertemp = 
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoding(false))
    // console.log(usertemp);

  }, [])

  return !loading ?
    <div className='min-h-screen flex flex-wrap content-between bg-gray-600 m-0 p-0 min-w-screen'>
      <div className='bg-gray-700 w-full'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    : null

}

export default App
