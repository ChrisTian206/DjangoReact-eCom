import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import ShippingPage from './Pages/ShippingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
function App() {

  //for dev only, CORS already setup in Django
  axios.defaults.baseURL = 'http://127.0.0.1:8000/'

  return (
    <Router>
      <Header />
      {/* py-3 add padding on both top and bottom. Also, using the <main> helps clerfiying the structure
      and understandability of the page. */}
      <main className='py-3'>
        {/* wrapping Routes in Container, makes all contents inside Routes be managed in the Grip System
        which is more organized and presentable */}
        <Container>
          <Routes>
            {/* exact -> url link gotta be exactly as '/' */}
            <Route path='/' Component={HomePage} exact />
            <Route path='/cart/:id?' Component={CartPage} exact />
            <Route path='/login' Component={LoginPage} />
            <Route path='/register' Component={RegisterPage} />
            <Route path='/products/:id' Component={ProductPage} />
            <Route path='/profile' Component={ProfilePage} />
            <Route path='/shipping' Component={ShippingPage} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
