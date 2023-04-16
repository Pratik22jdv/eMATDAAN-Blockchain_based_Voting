import './App.css';
import Navbar from './components/Navbar';
import Registration from './components/Registartion/Registration';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <div className="Navbar">
        <Navbar />
      </div>
      
      {/* <div className="RegistartionForm">
        <Registration />
      </div> */}

      <div className="LoginForm">
        <Login />
      </div>


    </div>
  );
}

export default App;
