import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
import { UserSettingsPage } from './UserSettingsPage'
import {RoutesPage} from './RoutesPage'

var transportConstants = [
  {type:"bike", "score": "0"},
  {type:"drive", "score": "0"},
  {type:"walk", "score": "0"}, 
]
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currPage: UserSettingsPage,
      type: "bike"
    }

  }
  changePage(newPage, inputs){
    this.setState({
      currPage:newPage,
      lastPageInputs: inputs
    })
    
  }
  componentWillUpdate(){

  }

  render() {
    return (
      <div className="App">
        <this.state.currPage changePage={this.changePage.bind(this)} inputs={this.state.lastPageInputs}/>
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
