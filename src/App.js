import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './Components/Header';
import AttendanceCalendar from './pages/AttendanceCalendar';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/attendance" element={<AttendanceCalendar/>} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App