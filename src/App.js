import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/SignUp/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route
              path="/"
              element={<Home />}
              title="Root"
            />

            <Route tittle='Sign In' element={<SignIn/>} path="/sign-in" />
            <Route tittle='Register' element={<Register/>} path="/register" />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
