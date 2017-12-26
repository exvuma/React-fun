// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.
import React, { Component } from 'react';
import logo from './icons/logo.svg';
import weatherbutton from './icons/weatherbutton.svg';
import walk from './icons/Walk.svg';
import bike from './icons/Bike.svg';
import { Route, MaxRoute, RouteList } from './Route'
import { RoutesPage } from './RoutesPage'
// import walk from './icons/Walk.svg';
// import walk from './icons/Walk.svg';
import './App.css';

var routeIconKeys = {
  walk: walk,
  bike: bike,
}
export class UserSettingsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            getToWorkTime: "16:14",//new Date("October 13, 2014 11:13:00").getTime(),
            wakeuptime: new Date(),
            destination: "",
            origin: "",
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (event) =>{
      this.props.changePage(RoutesPage, this.state)
    }
    handleChange = (event) => {
      console.log("event")
      console.log(event)
      const newState = {}
      newState[event.target.name] = event.target.value
            console.log("new sta")
            console.log(newState)    
      this.setState(newState)
      // this.setState({
      //   [event.target.name]: event.target.value
      // })
    }
    render() {
      var iconString =  "route-icon route-icon-" + this.props.type
     return (
      <div className="form">
        <p>
          <label for="getToWorkTime">Arrival Time:</label> 
          <input 
            name="getToWorkTime" 
            className="getToWorkTime"   
            defaultValue = "18:00" 
            type="time" 
            value={this.state.getToWorkTime} 
            onChange={this.handleChange}>
          </input>
        </p>
        <p>
          <label for="origin">Start Address:</label> 
          <input id="origin" 
                name="origin" 
                value = {this.state.origin}
                className="" 
                onChange={this.handleChange}
                label="Work Address">
          </input>
        </p>
        <p>
          <label for="destination">Destination Address:</label> 
          <input id="destination" 
                name="destination" 
                value = {this.state.destination}
                className="" 
                onChange={this.handleChange}
                label="Work Address">
          </input>
        </p>
        <button type="submit" onClick={this.handleSubmit}> Submit</button>
      </div>
    );
        // <img src={routeIconKeys[this.props.type]} className="App-icon"   />
  }

}


