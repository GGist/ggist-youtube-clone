import logo from './logo.svg';
import './App.css';
import React from "react"
import Header from "./components/Header"
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-main">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}

export default App;
