// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.
import React, { Component } from 'react';
import logo from './logo.svg';
import weatherbutton from './weatherbutton.svg';
import './App.css';

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
    giveScore = ()=>{
      console.log(this.state.score)
      return this.state.score
    }
    handleClick = ()=> {
        console.log(this.state)
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
    getInitialState =() => {
        return {score:0, selected: false}
    }
    calculateScore = ( time, weather ) => {
        return time * .2 + weather*.7
        // this.setState( { score: score  } );
     }
    componentWillUpdate(){
        console.log("componentDidUpdate")
    }
    render() {
     if (this.state.selected ==true ){console.log ('this state is active')}
     return (

      <div className="Route">
          <img src={weatherbutton} className="App-logo" alt="logo" onClick={this.handleWeatherClick}  />
           <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} calculateMax={this.props.calculateMax} />
          {this.props.type} My Score: {this.props.score}

      </div>
    );
  }

}
export class MaxRoute extends Component {
        constructor(props){
        super(props)
        this.state = {
            selected : false,
            score: 0,
            weather: 0,
            time: 0,
            origRoute: []
          }

    }
    render(){
        return <div>{this.state.score}</div>
    }
}
export class RouteList extends React.Component {
  onhandleClick = () => {
    console.log("route list handler")
  }
  render() {
    console.log(this.props)
    return (
      <div className="routes-list">
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


