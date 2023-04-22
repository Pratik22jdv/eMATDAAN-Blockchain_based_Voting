import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import useEth from "./contexts/EthContext/useEth";

function App() {

  const { state } = useEth();
  return (
    <div id="App">
      <Router>

        <Routes>

          <Route exact path="/" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ?
                <NoticeWrongNetwork /> : <Home />} />

          <Route path="/admin" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Redirect to="/" /> : <Admin />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
