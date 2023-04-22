import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Home />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
