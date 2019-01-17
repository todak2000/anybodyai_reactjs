import React, { Component } from 'react';
// import logo from './mic.svg';
import Home from "../src/Home/Home";
import Loader from "../src/Loader/Loader";
// import './App.css';
// using ES6 modules
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
 

 
class App extends Component {
 
  render() {
    return (
       
          <Router>
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/Loader" component={Loader} />
            </div>
          </Router>
 
            // <Home />
      
    );
  }
}

export default App;
