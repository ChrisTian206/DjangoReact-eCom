import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './Pages/HomePage';
function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-3'>
        <Container>
          <HomePage />
        </Container>

      </main>
      <Footer />
    </div>
  );
}

export default App;
