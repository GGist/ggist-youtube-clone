import logo from './logo.svg';
import './App.css';
import React from "react"
import ReactHeader from "./components/ReactHeader"
import ReactMainPage from './components/ReactMainPage';
import ReactSidebar from './components/ReactSidebar';

function App() {
  return (
    <div className="App">
      <ReactHeader />
      <div className="main-split">
        <ReactSidebar />
        <ReactMainPage />
      </div>
    </div>
  );
}

export default App;
