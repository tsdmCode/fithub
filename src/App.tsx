import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router'
import Splashscreen from './pages/Splashscreen/Splashscreen'
import Home from './pages/Home/Home'
import MySchedule from './pages/MySchedule/MySchedule'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Splashscreen />} />   
        <Route path='/home' element={<Home />} />   
        <Route path='/myschedule' element={<MySchedule />} />   
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
