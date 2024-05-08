
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AboutUs from "./pages/AboutUs/AboutUs";
import Admin from "./pages/Admin/Admin";
import AllLocations from "./pages/AllLocations/AllLocations";
import CreateLocation from "./pages/CreateLocation/CreateLocation";
import EditLocation from "./pages/EditLocation/EditLocation";
import FaqPagejsx from "./pages/FAQ/FaqPagejsx";
import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import Menu from "./pages/Menu/Menu";
import MyLocations from "./pages/MyLocations/MyLocations";
import SearchResult from "./pages/SearchResult/SearchResult";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/SignUp/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Terms from "./pages/TermsAndConditions/Terms";

function App() {
  return (
    <div>
        <Router>
          <Header/>
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
            <Route tittle='About us' element={<AboutUs/>} path="/about-us" />
            <Route tittle='Search Result' element={<SearchResult/>} path="/search-result" />
            <Route tittle='All Location' element={<AllLocations/>} path="/all-location" />
            <Route tittle='Menu' element={<Menu/>} path="/menu" />
            <Route tittle='FAQ' element={<FaqPagejsx/>} path="/faq" />
            <Route tittle='Terms and Conditions' element={<Terms/>} path="/termsandconditions" />
            

            

          </Routes>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;
