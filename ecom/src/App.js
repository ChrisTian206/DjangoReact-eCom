import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome Here!</h1>
        </Container>

      </main>
      <Footer />
    </div>
  );
}

export default App;
