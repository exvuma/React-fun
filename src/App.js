import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes } from './Routes'
var transportConstants = {

}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      routes: [],
    }

  }
  handleClick = ()=> {
    console.log(this)
  }
  populateRoutes(transportConstants){
    var routes = this.state.routes || {}
    routes.push([ <Routes type = "Bike" score="010" key="someid"/>

      ])
  }

  render() {
    //returns JSX
    this.populateRoutes(transportConstants)
    return (
      <div className="App">
        <h1>Routes</h1>
        {this.state.routes.map(route => {
          return <Routes type={route.type} score={route.score} key={route.id} />
        })}
      </div>
    );
  }
// Example to understand how JSX interprets in DOM
  // render() {
  //   return (
  //     React.createElement('div', { className: 'App'},
  //       React.createElement('h1', null, 'Routes'),
  //       this.state.routes.map(route => {
  //         // in element in state
  //         return React.createElement(Route, { type: route.type, score: route.score })
  //       })
  //     )
  //   )
  // }
}
export default App;
