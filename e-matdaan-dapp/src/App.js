import './App.css';
import Navbar from './components/Navbar';
import Registration from './components/Registartion/Registration';

function App() {
  return (
    <div>
      <div className="Navbar">
        <Navbar />
      </div>
      
      <div className="RegistartionForm">
        <Registration />
      </div>
    </div>
  );
}

export default App;
