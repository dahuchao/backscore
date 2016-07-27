import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import List from 'material-ui/lib/lists/list'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import Rencontre from "./rencontre.js"
import Tableau from "./tableau.js"
import RencontreEdition from "./rencontre-edition.js"
import RencontreListe from "./rencontre-liste.js"
import request from 'request'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

var App = React.createClass({
  getInitialState: function() {
    var adresse = location.href + "api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, this.listerRencontres)

    //this.state.ajoutRencontre = false
    //this.setState(this.state)
    return {
      rencontres: [],
      rencontre: {
        id: 1
      }
    }
  },
  liste: function() {
    this.setState(this.state)
    console.info("Liste les rencontres ")
  },
  listerRencontres: function(error, response, rencontres) {
    this.state.rencontre = null
    if (!error && response.statusCode == 200) {
      console.info("Initialisation des rencontres " + rencontres)
      let rrencontres = JSON.parse(rencontres)
      this.setState({rencontres: rrencontres})
    }
    this.setState(this.state)
  },
  rencontreSelectionnee: function(rencontre) {
    console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
    this.state.rencontre = rencontre
    this.setState(this.state)
    console.info("Etat rencontre: " + JSON.stringify(this.state))
  },
  ajoutRencontre: function(rencontre) {
    console.info("Ajout d'une rencontre: " + JSON.stringify(rencontre))
  },
  ajouterRencontre: function() {
    console.info("Ajout d'une rencontre index.")
    this.state.ajoutRencontre = false
    this.setState(this.state)
  },
  render() {
    // Affichage de la liste des rencontres
    let modeListe = !this.state.recontre && !this.state.ajoutRencontre
    console.info("Mode liste ?" + modeListe)
    console.info("Rencontres: " + this.state.rencontres)
    //console.info("Raffraichissement: " + JSON.stringify(this.state))
    //var liRencontres = this.state.rencontres.map(rencontre => {
    //  return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    //})
    const style = {
      marginRight: 20
    }
    var rencontre = {
      hote: {
        nom: "NEC",
        marque: 0
      },
      visiteur: {
        nom: "USJA",
        marque: 0
      }
    }
    return (
      <div>
        <AppBar title="Rencontres" onClick={this.listerRencontres} iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <FloatingActionButton onMouseDown={this.ajoutRencontre} style={style}>
              <ContentAdd/>
            </FloatingActionButton>
          </div>
        </AppBar>
        <section>
          <RencontreListe rencontres={this.state.rencontres}/>
          <RencontreEdition onAjout={this.ajoutRencontre} rencontre={rencontre}/>
          <Card>
            {this.state.rencontre
              ? <Tableau rencontre={this.state.rencontre.id}/>
              : null}
          </Card>
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
