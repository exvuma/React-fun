import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
var transportConstants = [
  {type:"bike", "score": "0"},
  {type:"drive", "score": "0"},
  {type:"walk", "score": "0"}, 
]
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      routes:[],
      maxRoute: [],
      otherroutes:[]
    }

  }
  componentDidMount(){
     this.populateRoute(transportConstants)
  }
    componentWillUpdate(){

    }
  calculateMax = (score,type)=> {
    var newRoutes = this.state.routes.map(route => {
      if(route.type !== type) return route
        return{type: type, score: score}
    })
    let max = newRoutes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
    }, this.state.routes[0])
    this.setState({
      routes: newRoutes,
      maxRoute: max
    })
  }
  populateRoute(transportConstants){
    let routes = transportConstants.map(route => {
          return route
        })
    let max = routes.reduce((prevRoute, curRoute) => {
          return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
        }, routes[0])
    this.setState({ 
      routes: routes,
      maxRoute: max,
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Route</h1>
        <RouteList 
          routes={this.state.routes} 
          onClick={this.handleClick} 
          calculateMax={this.calculateMax}
        />
        <h1> Best Route </h1>
        <Route 
          type={this.state.maxRoute.type} 
          score={this.state.maxRoute.score}
          calculateMax={this.calculateMax}
         />
      </div>

    );
  }
// Example to understand how JSX interprets in DOM
  // render() {
  //   return (
  //     React.createElement('div', { className: 'App'},
  //       React.createElement('h1', null, 'Route'),
  //       this.state.routes.map(route => {
  //         // in element in state
  //         return React.createElement(Route, { type: route.type, score: route.score })
  //       })
  //     )
  //   )
  // }
}
export default App;
