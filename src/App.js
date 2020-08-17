import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routing from './components/Routing';

export default function App() {

  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
        </header>
        <Routing />
      </Router>
    </div>
  );
}
