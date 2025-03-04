

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Dispaly1 from "./components/Dispaly1.jsx";
import Display2 from "./components/Display2.jsx";
import Recipe from "./components/Recipe.jsx";
import FormData from "./components/FormData.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {


  return (
    <>
       <Router>

           {/* default pages*/}
           <Routes>
               <Route path="/" element={
                   <>
                       <Nav/>
                       <Dispaly1 />
                       <Display2/>
                       <Recipe/>
                   </>
               }/>
               {/* form*/}
               <Route path="form" element={<FormData/>}/>
               <Route path="login" element={<LoginPage/>}/>
               {/* protected routes*/}
               <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>




           </Routes>

       </Router>

    </>
  )
}

export default App
