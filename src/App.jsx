import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./pages/auth/LogIn/Login";
import { NotFound } from "./pages/notFount";
import { Home } from "./pages/Home";
import { Layout } from "./layout/Layout";


const App = () => {


  return (

    <Router>
      <Routes>

        <Route path="/" element={<Login />} errorElement={< NotFound />} />
        <Route path="/login" element={<Login />} errorElement={< NotFound />} />
        <Route path="/home" element= {<Home />} errorElement={< NotFound />}/>
        
        {/* <Route path="/home" element={<Layout /> } errorElement={<NotFound />}>
          <Route path="/home/" element={<Home />} errorElement={< NotFound />} index/>
        </Route> */}

      </Routes>
    </Router>


  )


}

export default App
