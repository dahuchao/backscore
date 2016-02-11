import React from 'react'
import ReactDOM from 'react-dom';
import Rencontres from "./src/rencontres.js"
import AppBar from 'material-ui/lib/app-bar';

var App = React.createClass({
  getInitialState: function() {
    return {
      nom: "unNom"
    }
  },
  tel: function() {
    this.setState({
      nom: this.state.nom + "I"
    })
  },
  render() {
    return (
      <div onClick={this.tel}>
        <section>
          <p>{this.state.nom}</p>
        </section>
      </div>
    )
  }
})
ReactDOM.render(< App />, document.querySelector('#content'))
