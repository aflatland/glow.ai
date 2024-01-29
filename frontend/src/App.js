import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import ChatRoom from "./pages/ChatRoom"

function App() {
  return (
    <Router>
          <Routes>
              <Route exact path="/chat" element={<ChatRoom />} />
              <Route exact path = "/" element = {<Home />} />
          </Routes>
    </Router>
  );
}

export default App;