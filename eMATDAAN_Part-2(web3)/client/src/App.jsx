import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import VerificationStatus from "./components/User/VerificationStatus";
import ShowResult from "./components/Vote/ShowResult";
import Vote from "./components/Vote/Vote";
import Admin from "./components/Admin/Admin";
import AddUser from "./components/Admin/AddUser";
import StartEndElection from "./components/Admin/StartEndElection";
import DeclareResult from "./components/Admin/declareResult";

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

          <Route exact path="/user/result" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ?
                <NoticeWrongNetwork /> : <ShowResult />} />

          <Route exact path="/user/vote" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ?
                <NoticeWrongNetwork /> : <Vote />} />

          <Route path="/admin" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Navigate to="/" /> : <Admin />} />

          <Route path="/admin/addUser" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Navigate to="/" /> : <AddUser />} />

          <Route path="/admin/startEndElection" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Navigate to="/" /> : <StartEndElection />} />

          <Route path="/admin/result" element={
            !state.artifact ?
              <NoticeNoArtifact /> :
              !state.contract ? <Navigate to="/" /> : <DeclareResult />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
