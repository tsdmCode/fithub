import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useFetch } from './hooks/useFetch';
import type { Teams } from './types/types';
import Splashscreen from './pages/Splashscreen/Splashscreen';
import Home from './pages/Home/Home';
import MySchedule from './pages/MySchedule/MySchedule';
import ClassDetails from './pages/ClassDetails/ClassDetails';
import Search from './pages/Search/Search';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
//todo: search page! og register page! Flyt kaldet til app?
function App() {
  const { data } = useFetch<Teams[]>(import.meta.env.VITE_URL + '/api/teams');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Splashscreen />} />
          <Route path="/home" element={<Home data={data} />} />
          <Route path="/myschedule" element={<MySchedule />} />
          <Route path="/team/:id" element={<ClassDetails />} />
          <Route path="/search" element={<Search teams={data} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
