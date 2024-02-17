import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
            <Route path='/products/:id' Component={ProductPage} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
