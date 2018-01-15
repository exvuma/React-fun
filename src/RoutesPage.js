import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
import { UserSettingsPage } from './UserSettingsPage'
import {  DirectionsMapsComponent } from './googleMaps'

var transportConstants = [
  {type:"bike", "state": {"score": 20 , "duration": 12 }},
  {type:"drive", "state": {"score": 1 , "duration": 11 }},
  {type:"walk", "state": {"score": 0 , "duration": 20 }},
]
const URLexample = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=YOUR_API_KEY"
const URL = "https://maps.googleapis.com/maps/api/directions/json"
const myGoogleAPIkey = process.env.REACT_APP_googleAPIkey//"AIzaSyD1vtj1Nr3eI2CuQk305XyTFwxFK0U0njU"
console.log("key", myGoogleAPIkey)
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
    transportConstants = this.getGoogleRoutes(transportConstants)
    this.state = {
      routes:transportConstants.map(route => { return route}),
      maxRoute: {
        type: "NA",
        state: {
          score: 0,
          duration: 0
        },
      googresp : ""
      }
    }

  }
  getGoogleRoutes =  () =>{
    // get Google routes for each transport constant
   return transportConstants.map( async type => {
        let dur = await this.getGoogleRoute(type)
        return{
          type: typeToMode,
          state:{
            duration: dur,
            score: dur + 5
            
          }
        }
  })
}

    getGoogleRoute = async (type) =>{
    try{
      var URL = "https://maps.googleapis.com/maps/api/directions/json"
      var params = new URLSearchParams({
                    "key": myGoogleAPIkey,
                    "origin": this.props.inputs.origin,
                    "destination": this.props.inputs.destination,
                    "arrival_time" : this.props.inputs.getToWorkTime,
                    "mode": typeToMode[type]
                   }).toString()
      var headers = new Headers();
      headers.append("Content-Type", "applications/json")
      // headers.append('Access-Control-Allow-Headers', 'Content-Type, Origin, Content-Type, X-Auth-Token')
      // headers.append("Access-Control-Allow-Origin", "*");
      // headers.append("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');

      // console.log(URL + params)
      var thisURL = URL +'?' + params

      const resp = await fetch(thisURL,{
          headers: headers,
      })
      const text = await resp.text()
      const dur = text.routes[0].legs[0].duration.value //TODO set try/catch if routes[0] DNE
      // this.setState({
      //       googleres: text,
      //       duration: dur,
      //     })
      console.log("repsonse return")
      console.log(text)
      return text

    }catch(err){
      console.log("error get goolge results")
      console.log(err)
      return err
    }
  }
  updateRoutes = (state,type)=> {
    //updates Routes with a new state of type = type
    var newRoutes = this.state.routes.map(async route => {
      // replace only the route with this type
      if(route.type !== type) return route
 //       let result =  await this.getGoogleRoutes(type)
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
      maxRouteScore: 123,
      googresp: this.state.googresp
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


    );
  }
}
