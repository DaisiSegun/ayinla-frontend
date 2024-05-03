import Admin from "./pages/Admin/Admin";
import CreateLocation from "./pages/CreateLocation/CreateLocation";
import EditLocation from "./pages/EditLocation/EditLocation";
import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import MyLocations from "./pages/MyLocations/MyLocations";
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
            <Route tittle='Location' element={<Location/>} path="/location/:id" />
            <Route tittle='Admin' element={<Admin/>} path="/admin" />
            <Route tittle='Create Location' element={<CreateLocation/>} path="/create-location" />
            <Route tittle='My Locations' element={<MyLocations/>} path="/my-locations" />
            <Route tittle='Edit Location' element={<EditLocation/>} path="/edit-location/:id" />
            

            

          </Routes>
        </Router>
    </div>
  );
}

export default App;
