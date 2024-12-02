import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx'; // Home Page Component
import Bed from './pages/Bed.jsx'; // Other Components
import Wardrobe from './pages/Wardrobe.jsx';
import Dressing_Table from './pages/Dressing_Table.jsx';
import Counter from './pages/Counter.jsx';
import Other from './pages/Other.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Admin from './pages/Admin.jsx';
import AddToCart from './pages/AddToCart.jsx';
import ProfileImage from './pages/ProfileImage.jsx';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bed" element={<Bed />} />
          <Route path="/Wardrobe" element={<Wardrobe />} />
          <Route path="/Dressing_Table" element={<Dressing_Table />} />
          <Route path="/Counter" element={<Counter />} />
          <Route path="/Other" element={<Other />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ASfurniture/Admin" element={<Admin />} />
          <Route path="/ProfileImage" element={<ProfileImage />} />
          <Route path='/AddToCart' element={<AddToCart />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
