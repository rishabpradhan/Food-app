import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Dispaly1 from "./components/Dispaly1.jsx";
import Display2 from "./components/Display2.jsx";
import Recipe from "./components/Recipe.jsx";
import FormData from "./components/FormData.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RecipeList from "./components/RecipeList.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminPage from "./components/AdminPage.jsx";
import About from "./components/About.jsx";
function App() {
  return (
    <>
      <Router>
        {/* default pages*/}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Dispaly1 />
                <Display2 />
                <Recipe />
              </>
            }
          />
          {/* form*/}
          <Route path="recipes" element={<RecipeList />} />
          <Route path="form" element={<FormData />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="about" element={<About />} />
          {/* protected routes*/}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* admin routes routes*/}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route
            path="/AdminPage"
            element={
              <AdminProtectedRoute>
                <AdminPage />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
