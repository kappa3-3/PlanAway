import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routing from './components/Routing';
import Footer from './components/Footer';
import './App.css';

export default function App() {

  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
        </header>
        <div className="content-wrapper">
          <Routing />
        </div>
      </Router>
      <Footer />
    </div>
  );
}
