import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route, Router } from 'react-router-dom';
import Workspace from './components/Workspaces';
import history from './components/history';
function App() {
  return (
    <div className = "appjs">
      
      <Router history = {history}>
      <Header/>
      <Switch>

      <Route exact path='/' component={MainComponent} />
      <Route exact path = '/workspaces' component = {Workspace}/>
      </Switch>
      
      
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
