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
        this.score = 0

    }
    giveScore = ()=>{
      console.log(this.state.score)
      return this.state.score
    }
    handleClick = ()=> {
             console.log(this)
    }
    handleWeatherClick= () =>{//
        var newscore = this.calculateScore(this.state.time, this.state.weather )
        this.setState({
                weather: this.state.weather + 1,
                score : newscore
            })
        this.score = newscore

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
           <img src={logo} className="App-logo" alt="logo" onClick={this.props.onClick}  />
          {this.props.type} My Score: {this.state.score}

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
          // var score = route.getScore()
          return <Route type={route.type} key={route.id} onClick={this.props.onClick}/>
        })}
      </div>
    )
  }
}
// export  Route;

// var ServiceChooser = React.createClass({

//     getInitialState: function(){
//         return { total: 0 };
//     },

//     addTotal: function( price ){
//         this.setState( { total: this.state.total + price } );
//     },

//     render: function() {

//         var self = this;

//         var services = this.props.items.map(function(s){

//             // Create a new Service component for each item in the items array.
//             // Notice that I pass the self.addTotal function to the component.

//             return <Service name={s.name} price={s.price} active={s.active} addTotal={self.addTotal} />;
//         });

//         return <div>
//                     <h1>Our services</h1>
                    
//                     <div id="services">
//                         {services}

//                         <p id="total">Total <b>${this.state.total.toFixed(2)}</b></p>

//                     </div>

//                 </div>;

//     }
// });


// var Service = React.createClass({

//     getInitialState: function(){
//         return { active: false };
//     },

//     clickHandler: function (){

//         var active = !this.state.active;

//         this.setState({ active: active });
        
//         // Notify the ServiceChooser, by calling its addTotal method
//         this.props.addTotal( active ? this.props.price : -this.props.price );

//     },

//     render: function(){

//         return  <p className={ this.state.active ? 'active' : '' } onClick={this.clickHandler}>
//                     {this.props.name} <b>${this.props.price.toFixed(2)}</b>
//                 </p>;

//     }

// });


// var services = [
//     { name: 'Web Development', price: 300 },
//     { name: 'Design', price: 400 },
//     { name: 'Integration', price: 250 },
//     { name: 'Training', price: 220 }
// ];


// // Render the ServiceChooser component, and pass the array of services

// ReactDOM.render(
//     <ServiceChooser items={ services } />,
//     document.getElementById('container')
// );


// <Route score={50} type="walking" />
// <Route score={110} type="biking" />
// <Route score={25} type="driving" />


