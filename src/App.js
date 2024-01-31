import './App.css';
import AppRouter  from './AppRouter';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
     <NavBar />
     <AppRouter />
     <Footer />
    </div>
  );
}

export default App;
