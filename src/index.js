import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/lib/app-bar'
import List from 'material-ui/lib/lists/list'
import Rencontre from "./rencontre.js"
import Tableau from "./tableau.js"
var request = require('request')

var App = React.createClass({
  getInitialState: function() {
    var adresse = location + "api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, this.listerRencontres)
    return {rencontres: [], rencontre: null}
  },
  liste: function() {
    this.setState(this.state)
    console.info("Liste les rencontres ")
  },
  listerRencontres: function(error, response, body) {
    this.state.rencontre = null
    if (!error && response.statusCode == 200) {
      console.info("Initialisation des rencontres " + JSON.stringify(body))
      this.state.rencontres = JSON.parse(body)
    }
    this.setState(this.state)
  },
  rencontreSelectionnee: function(rencontre) {
    console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
    this.state.rencontre = rencontre
    this.setState(this.state)
    console.info("Etat rencontre: " + JSON.stringify(this.state))
  },
  render() {
    console.info("Raffraichissement: " + JSON.stringify(this.state))
    var liRencontres = this.state.rencontres.map(rencontre => {
      return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    })
    return (
      <div>
        <AppBar title="Title" onClick={this.listerRencontres} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <section>
          <List>
            {!this.state.rencontre
              ? liRencontres
              : null}
          </List>
          {this.state.rencontre
            ? <Tableau rencontre={this.state.rencontre.id}/>
            : null}
        </section>
        <footer>
          <div className="info">
            <div className="organisateur">
              Ligue régionale de basket des Pays de la Loire, Saison régulière
            </div>
            <div className="date">
              Dim. 10 janvier 2016
            </div>
          </div>
        </footer>
      </div>
    )
  }
})
ReactDOM.render(< App />, document.querySelector('#content'))
