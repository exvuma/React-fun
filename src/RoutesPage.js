import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
import { UserSettingsPage } from './UserSettingsPage'
import {  DirectionsMapsComponent } from './googleMaps'

const transportConstants = [
  {type:"bike", "state": {"score": 20 , "duration": 12 }},
  {type:"drive", "state": {"score": 1 , "duration": 11 }},
  {type:"walk", "state": {"score": 0 , "duration": 20 }},
]
const google = window.google
const URLexample = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=YOUR_API_KEY"
const URL = "https://maps.googleapis.com/maps/api/directions/json"
const myGoogleAPIkey = process.env.REACT_APP_googleAPIkey//"AIzaSyD1vtj1Nr3eI2CuQk305XyTFwxFK0U0njU"
const typeToMode = {
  //converts Google API terms for modes from type
  "bike":"BICYCLING",// google.maps.TravelMode.DRIVING
  "drive":"DRIVING",
  "walk":"WALKING",
  "transit":"TRANSIT",
}
export class RoutesPage extends Component {
  constructor(props){
    super(props)
    this.getGoogleRoutes()
    .then((resp) => {      
      this.setState(
       { routes:resp.map(route => { return route})}
      )
    })
    .catch((reason) => {
      this.setState({
        error: reason
      })
    })
    this.state = {
      maxRoute: {
        type: "DRIVING",
        state: {
          score: 0,
          duration: 0
        }
      }
    }
  }
  calculateScore = (duration) => {
    // TODO calculate score off legit algorythm, potentially adding
    // more variable later (e.g. preference for biking..)
    return  1000 - duration ;
  }
  secsToMins = (secs) => {
    return Math.floor(secs / 60);
  }
  getGoogleRoutes =  () => {
    var directionsService = new google.maps.DirectionsService();
    var origin = this.props.inputs.origin
    var destination = this.props.inputs.destination
    return  Promise.all(transportConstants.map((route) => {
      var request = {
        origin: origin,
        destination: destination,
        travelMode: typeToMode[route.type],
        // drivingOptions: {
        //   arrivalTime: this.props.inputs.getToWorkTime,
        // }
      };
      // turn directionsService.route into a new Promise that we can then explicity
      // tell to resolve/reject. This way we can use Promise.all to ensure that 
      // all those directionsService.routes are finished
      return new Promise((resolve, reject) => 
      {
        directionsService.route(request, (result, status) => {
          if (status == 'OK') {
            console.log("resyots!!")
            // return {type:route.type, "state": {"score": this.calculateScore(dur) , "duration": dur }}
            console.log(result)
            let dur  = result.routes[0].legs[0].duration.text
            let val = result.routes[0].legs[0].duration.value//value indicates the duration in seconds.

            return resolve({type:route.type, "state": {"score": this.calculateScore(val) , "duration": this.secsToMins(val) }})
          }
          else{
            reject(result)
            return  {type:"bike", "state": {"score": 20 , "duration": 12 }}
          }
        })
      })
    }))
  }
  updateRoutes = (state,type)=> {
    //updates Routes with a new state of type = type

    var newRoutes = this.state.routes.map( route => {
      // replace only the route with this type
      if(route.type !== type) return route
      return{type: type, state: state}
    })
    let max = newRoutes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.state.score > curRoute.state.score) ?
          {type:prevRoute.type , state:prevRoute.state} :
          {type:curRoute.type, state:curRoute.state}
        )
    }, this.state.maxRoute)
    console.log("leave home")
    console.log( this.props.inputs.getToWorkTime)
    console.log(max.state.duration)
    let leaveHomeTime = this.props.inputs.getToWorkTime - max.state.duration
    this.setState({
      routes: newRoutes,
      maxRoute: max,
      leaveHomeTime: leaveHomeTime, 
      maxRouteScore: max.state.score,
      googresp: this.state.googresp
    })
  }

  onBackClick = () => {
    this.props.changePage(UserSettingsPage, this.props.inputs)
  }
  render() {
    return (
      <div className="App">
      <div className="back-button" onClick={this.onBackClick}></div>  
      {this.state.routes ?  (
        <div>
          <div> To get to work by: {this.props.inputs.getToWorkTime}</div>
          <div> Leave at: {this.state.leaveHomeTime}</div>
          <h1> Best Route </h1>
          <Route
            type={this.state.maxRoute.type}
            score={this.state.maxRoute.state.score}
            duration={this.state.maxRoute.state.duration}
            updateRoutes={this.updateRoutes}
            isBest="True"
          />
          <h1>Other Routes</h1>
          <RouteList
            routes={this.state.routes}
            onClick={this.handleClick}
            updateRoutes={this.updateRoutes}
          />
          <DirectionsMapsComponent isMarkerShown={true}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            origin={this.props.inputs.origin}
            destination={this.props.inputs.destination}
            travelMode={typeToMode[this.state.maxRoute.type]}
          />
        </div>
      ) :(
        <div>Error! {this.state.error ? this.state.error.status : "Error"}</div>
      )}
      </div>

    );
  }
}
