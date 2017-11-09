import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, MaxRoute, RouteList } from './Route'
var transportConstants = [
  {type:"Bike", "score": "800"}, {type:"Drive", "score": "80"}
]


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      routes:[],
      maxRoute: [],
      otherroutes:[]
    }
  //  this.populateRoute(transportConstants)

  }
  componentDidMount(){
    console.log("App Did Mount")
     this.populateRoute(transportConstants)
  }
    componentWillUpdate(){
    let max = this.state.routes.reduce((prevRoute, curRoute) => {
          return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
        }, this.state.routes[0])

    }
  handleClick = ()=> {
    let max = this.state.routes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
    }, this.state.routes[0])
    console.log(max)
    this.setState({
      maxRoute: max
    })
  }
  calculateMax = (score,type)=> {
    var newRoutes = this.state.routes.map(route => {
      if(route.type !== type) return route
        return{type: type, score: score}
    })
    //newRoutes.pop(updatedRoute)
    console.log("calculateMax line 43")
    console.log(newRoutes)

    // newRoutes.pop(type) = updatedRoute.values()[0]
    let max = newRoutes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
    }, this.state.routes[0])
    this.setState({
      routes: newRoutes,
      maxRoute: max
    })
  }
  // updateListClick = () =>{
  //   this.setState({
  //     routes: this.state.routes.map(currRoute => {
  //       if (currRoute !== route) return currRoute
  //       return Object.assign(currRoute, { score: ~~(Math.random() * 150) })
  //     })
  //   })
  // }
  populateRoute(transportConstants){
    let routes = transportConstants.map(route => {
          return route
         //let newroute = React.createElement(Route({type:"asdasd"}))
       //  return new Route({type:"asda"})
        })
    let max = routes.reduce((prevRoute, curRoute) => {
          return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
        }, routes[0])
    console.log("routes")
    console.log(routes)
    this.setState({ 
      routes: routes,
      maxRoute: max,
    })
  }

  render() {
   var maxRoute = this.state.routes[0]|| {"type": "NA"}
   console.log("kids")
   const bestRoute = this.state.routes.sort((a, b) => a.score > b.score ? 1 : -1, this.state.routes[0])[0]
   if (bestRoute)
    console.log(bestRoute)
    return (
      <div className="App">
        <h1>Route</h1>
        <RouteList routes={this.state.routes} onClick={this.handleClick} calculateMax={this.calculateMax}/>
        <h1> Best Route </h1>
        <Route type={this.state.maxRoute.type} score={this.state.maxRoute.score} />
      <button onClick={this.handleClick}>Update Max</button>
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
