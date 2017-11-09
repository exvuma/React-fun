// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.
import React, { Component } from 'react';
import logo from './icons/logo.svg';
import weatherbutton from './icons/weatherbutton.svg';
import walk from './icons/Walk.svg';
import bike from './icons/Bike.svg';
// import walk from './icons/Walk.svg';
// import walk from './icons/Walk.svg';
import './App.css';

var routeIconKeys = {
  walk: walk,
  bike: bike,
}
export class Route extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected : false,
            score: 0,
            weather: 0,
            time: 0
          }

    }
    handleClick = ()=> {
    
    }
    getMyIcon = () =>{
        this.icon = routeIconKeys[this.props.type]
    }
    handleWeatherClick= () =>{//
        var newscore = this.calculateScore(this.state.time, this.state.weather )
        this.setState({
                weather: this.state.weather + 1,
                score : newscore
            })
        //where the magic happens, this calls that calculateMax function that has 
        // been passed into props since App
        // then in App.js that calculateMax feature calls setState
        this.props.calculateMax(this.state.score, this.props.type)

    }
    handlePerferenceChange= () =>{//
        var newscore = this.calculateScore(this.state.time, this.state.weather )
        this.setState({
                weather: this.state.weather + 1,
                score : newscore
            })
        //where the magic happens, this calls that calculateMax function that has 
        // been passed into props since App
        // then in App.js that calculateMax feature calls setState
        this.props.calculateMax(this.state.score, this.props.type)

    }
    getInitialState =() => {
        return {score:0, selected: false}
    }
    calculateScore = ( time, weather ) => {
        return parseInt(time * .2 + weather*.7)
     }
    componentWillUpdate(){
        
    }
    render() {
      this.getMyIcon()
      var iconString =  "route-icon route-icon-" + this.props.type
     return (
      <div className="route">
        <div className={iconString} onClick={this.handleWeatherClick} ></div>
        <div className="route-title">{this.props.type}</div>
        <div className="route-icon route-icon-best"></div>
        <div className="route-icon route-icon-chevron"></div>
        <div className="route-title">My Score: {this.props.score}</div>

      </div>
    );
        // <img src={routeIconKeys[this.props.type]} className="App-icon"   />
  }

}
export class RouteList extends React.Component {
  onhandleClick = () => {
  }
  render()    { return (
      <div className="routes">
        {this.props.routes.map(route => {
          return(
            <Route
                type = { route.type }
                key = { route.id }
                onClick = { this.props.onClick }
                calculateMax = { this.props.calculateMax }
                score = { route.score }
            />)
        })}
      </div>
    )
  }
}


