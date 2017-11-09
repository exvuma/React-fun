import App from './App.js';
import React, { Component } from 'react';
import logo from './icons/logo.svg';

class AppChild extends App {
    handleClick = () => {
      console.log("this")
      super.handleClick
    }
    render() {
    
    return (
     <div className="AppChild">
        <header className="AppChild-header">
        
        </header>
        <p className="AppChild-intro">
          To get started, edit <code>src/AppC.js</code> and save to reload.
            <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
        
        </p>
      </div>
    );
  }

}
export default AppChild;