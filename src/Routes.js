// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class Routes extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected : false,
            score: 0
          }

    }
    handleClick = ()=> {
             console.log(this)
    }
    getInitialState =() => {
        return {score:0, selected: false}
    }
    calculateScore = ( time, weather ) => {
        let score = time * .2 + weather*.7
        this.setState( { score: score  } );
     }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    render() {
     if (this.state.selected ==true ){console.log ('this state is active')}
     return (

      <div className="Routes">
        {this.props.score} {this.props.type}
          <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
      </div>
    );
  }

}
