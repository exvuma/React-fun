import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
import { UserSettingsPage } from './UserSettingsPage'
import { MyMapsComponent, DirectionsMapsComponent } from './googleMaps'

var transportConstants = [
  {type:"bike", "state": {"score": 20 , "duration": 12 }},
  {type:"drive", "state": {"score": 1 , "duration": 11 }},
  {type:"walk", "state": {"score": 0 , "duration": 20 }},
]
const URLexample = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=YOUR_API_KEY"
const URL = "https://maps.googleapis.com/maps/api/directions/json"
const myGoogleAPIkey = "redacted"// process.env.googleAPIkey
const typeToMode = {
  //converts Google API terms for modes from type
  "bike":"bicycling",
  "drive":"driving",
  "walk":"walking",
  "transit":"transit",
}
export class RoutesPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      routes:transportConstants.map(route => { return route}),
      maxRoute: {
        type: "NA",
        state: {
          score: 0,
          duration: 0
        }
      }
    }
    console.log("my key")
    console.log(myGoogleAPIkey)

  }
  getGoogleRoutes = (type) => {
    var URL = "https://maps.googleapis.com/maps/api/directions/json"
    var params = new URLSearchParams({
                  "key": myGoogleAPIkey,
                  "origin": this.props.inputs.origin,
                  "destination": this.props.inputs.destination,
                  "mode": typeToMode[type]
                 }).toString()
    var headers = new Headers();
    headers.append("Content-Type", "applications/json");
    headers.append("Access-Control-Allow-Origin", "*");
    // console.log(URL + params)
    var thisURL = URL +'?' + params
    var resp = fetch(thisURL,{
        headers: headers,
    })
    .then((response) => {
        if(response.ok) {
          return response.text();
        }
    })
    .then(function(response){
        this.setState({
          routes: response
        })
    console.log("repsonse return")
    console.log(response)
        return response
    })
    .catch((error) => {
        console.log("shiit")
        console.log(error)
    })
  }
  updateRoutes = (state,type)=> {
    //updates Routes with a new state of type = type
    var newRoutes = this.state.routes.map(route => {
      // replace only the route with this type
      if(route.type !== type) return route
        this.getGoogleRoutes(type)
        return{type: type, state: state}
    })
    let max = newRoutes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.state.score > curRoute.state.score) ?
          {type:prevRoute.type , state:prevRoute.state} :
          {type:curRoute.type, state:curRoute.state}
        )
    }, this.state.maxRoute)
    this.setState({
      routes: newRoutes,
      maxRoute: max,
      maxRouteScore: 123
    })
  }

  onBackClick = () => {
    this.props.changePage(UserSettingsPage)
  }

  render() {
    // if(this.state.maxRoute.state)
    return (
      <div className="App">
        <div className="back-button" onClick={this.onBackClick}></div>
        <div > To get to work by: {this.props.inputs.getToWorkTime}</div>
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
      <MyMapsComponent isMarkerShown={true}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        />
      <DirectionsMapsComponent isMarkerShown={true}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        origin={this.props.inputs.origin}
        destination={this.props.inputs.destination}
        />
      </div>


    );
  }
}
