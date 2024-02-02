import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
          <Routes>
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/login" element={<Login />} />
              <Route exact path = "/" element = {<Home />} />
          </Routes>
    </Router>
  );
}

export default App;