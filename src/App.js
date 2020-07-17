import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <div className = "appjs">
      <Header/>
      <MainComponent/>
      <Footer/>
    </div>
  );
}

export default App;
