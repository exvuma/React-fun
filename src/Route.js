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
            score: this.props.score || 22 ,
            weather: 0,
            duration: this.props.duration || 22,
            wakeuptime: new Date()
          }

    }
    handleClick = ()=> {
    
    }
    getMyIcon = () =>{
        this.icon = routeIconKeys[this.props.type]
    }
    handleWeatherClick = () =>{//
        var newscore = this.calculateScore(this.state.duration, this.state.weather )
        this.setState({
                weather: this.state.weather + 1,
                score : newscore
            })
        //where the magic happens, this calls that updateRoutes function that has 
        // been passed into props since App
        // then in App.js that updateRoutes feature calls setState
        this.props.updateRoutes(this.state, this.props.type)

    }

    getInitialState =() => {
        return {score:0, selected: false}
    }
    calculateScore = ( duration, weather ) => {
      var newscore = parseInt(duration * .2 + weather*.7)
      console.log(newscore)
      this.setState({
        score: newscore
      })
        return newscore

     }
    componentWillMount(){
        
        console.log("route mounting")
     }
    componentDidMount(){
       console.log("route did mounting")
        //  this.calculateScore(this.state.duration, this.state.weather)
          this.props.updateRoutes(this.state, this.props.type)
    }
    componentWillUpdate(){
       // this.props.updateRoutes(this.state, this.props.type)
    }
    render() {
      this.getMyIcon()
      var iconString =  "route-icon route-icon-" + this.props.type
      // var duration = this.props.duration ? this.props.duration : this.state.duration
     return (
      <div className="route">
        <div className={iconString} onClick={this.handleWeatherClick} ></div>
        <div className="route-icon route-icon-best"></div>
        <div className="route-icon route-icon-chevron"></div>
        <div className="route-title">{this.props.duration} minutes</div>

      </div>
    );
        // <img src={routeIconKeys[this.props.type]} className="App-icon"   />
  }

}
export class RouteList extends React.Component {
  onhandleClick = () => {
  }
  setTimer = () => {
    // 
  }
  render()    { 

    return (
      <div className="routes">
        {this.props.routes.map(route => {
          return(
            <Route
                type = { route.type }
                key = { route.id }
                onClick = { this.props.onClick }
                updateRoutes = { this.props.updateRoutes }
                score = { route.state.score }
                duration = { route.state.duration }
            />)
        })}
      </div>
    )
  }
}


