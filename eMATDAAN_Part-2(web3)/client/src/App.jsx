import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import VerificationStatus from "./components/User/VerificationStatus";
import Admin from "./components/Admin/Admin";
import AddUser from "./components/Admin/AddUser";
import StartEndElection from "./components/Admin/StartEndElection";

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

          <Route exact path="/user" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ?
                <NoticeWrongNetwork /> : <User />} />

          <Route exact path="/user/verifyStatus" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ?
                <NoticeWrongNetwork /> : <VerificationStatus />} />

          <Route path="/admin" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Redirect to="/" /> : <Admin />} />

          <Route path="/admin/addUser" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Redirect to="/" /> : <AddUser />} />

          <Route path="/admin/startEndElection" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Redirect to="/" /> : <StartEndElection />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
