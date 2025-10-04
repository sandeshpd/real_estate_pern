import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import ShowListing from './pages/ShowListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/listing/show/:id' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/listing/create' element={<CreateListing />} />
          <Route path='/listing/show' element={<ShowListing />} />
          <Route path='/listing/update/:id' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;