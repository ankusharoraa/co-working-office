import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';

function App(props) {
  return (
    <div className="appjs">
      
        <MainComponent />
      
    </div>
  );
}

export default App;
// render={(props) => <Workspace zipCode="Hello," {...props} />}