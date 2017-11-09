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
        console.log("App DidUpdate")
    let max = this.state.routes.reduce((prevRoute, curRoute) => {
          return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
        }, this.state.routes[0])
    console.log("routes")
    console.log(this.state.routes)
    // this.setState({ 
    //   maxRoute: max
    // })
    }
  handleClick = ()=> {
    console.log(this)
    let max = this.state.routes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
    }, this.state.routes[0])
    console.log(max)
    this.setState({
      maxRoute: max
    })
  }
  calculateMax = (updatedRoute)=> {
    var newRoutes = this.routes
    //newRoutes.pop(updatedRoute)
    newRoutes[updatedRoute.keys()[0]] = updatedRoute.values()[0]
    let max = this.state.routes.reduce((prevRoute, curRoute) => {
      return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
    }, this.state.routes[0])
    setState({
      routes: newRoutes,
      max: max
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
    // var routes = this.state.routes || {}
    // let routes = transportConstants.map(route => {
    //      // return route
    //      return ( <Route type={route.type}/>)
    //     })
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
      //otherroutes: otherroutes
    })
  }

  render() {
    //returns JSX
    console.log("mac route")
    console.log(this.state.maxRoute)
   // this.populateRoute(transportConstants)
   // var maxRoute = this.state.routes.reduce((prevRoute, curRoute) => {
   //    return ((prevRoute.score > curRoute.score) ? prevRoute : curRoute)
   //  }, this.state.routes[0]) || {"type": "NA"}
   var maxRoute = this.state.routes[0]|| {"type": "NA"}
   console.log("kids")
   // console.log( this.props.children)
   // console.log(maxRoute)
   const bestRoute = this.state.routes.sort((a, b) => a.score > b.score ? 1 : -1, this.state.routes[0])[0]
   if (bestRoute)
    console.log(bestRoute)
    return (
      <div className="App">
        <h1>Route</h1>
        <RouteList routes={this.state.routes} onClick={this.handleClick}/>
        <h1> Best Route </h1>
          <MaxRoute type={maxRoute.type} score={maxRoute.state} key={maxRoute.id} maxProp={maxRoute.props} />
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
