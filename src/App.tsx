import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router'
import Splashscreen from './pages/Splashscreen/Splashscreen'
import Home from './pages/Home/Home'
import MySchedule from './pages/MySchedule/MySchedule'
import ClassDetails from './pages/ClassDetails/ClassDetails'
import Search from './pages/Search/Search'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Splashscreen />} />   
        <Route path='/home' element={<Home />} />   
        <Route path='/myschedule' element={<MySchedule />} />   
        <Route path='/team/:id' element={<ClassDetails />} />   
        <Route path='/search' element={<Search />} />   
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
