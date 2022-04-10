import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    // BEM naming convention
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path="/rooms/:roomId" element={<Chat />}></Route>
              <Route exact path="/" element={<Chat />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
