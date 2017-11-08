// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class Routes extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected : false
          }

    }
    handleClick = ()=> {
             console.log(this)
    }
    getInitialState =() => {
        this.total= 0 
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    render() {
     if (this.state.selected ==true ){console.log ('this state is active')}
     return (

      <div className="App">
        {this.props.score} {this.props.type}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

}
// export  Routes;

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


