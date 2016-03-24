import React from 'react'
import ReactDOM from 'react-dom'
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
    return {rencontres: [], rencontre: null}
  },
  liste: function() {
    this.setState(this.state)
    console.info("Liste les rencontres ")
  },
  listerRencontres: function(error, response, rencontres) {
    this.state.rencontre = null
    if (!error && response.statusCode == 200) {
      console.info("Initialisation des rencontres " + rencontres)
      this.state.rencontres = JSON.parse(rencontres)
    }
    this.setState(this.state)
  },
  rencontreSelectionnee: function(rencontre) {
    console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
    this.state.rencontre = rencontre
    this.setState(this.state)
    console.info("Etat rencontre: " + JSON.stringify(this.state))
  },
  ajoutRencontre: function() {
    console.info("Ajout d'une rencontre.")
    this.state.ajoutRencontre = true
    this.setState(this.state)
  },
  ajouterRencontre: function() {
    console.info("Ajout d'une rencontre.")
    this.state.ajoutRencontre = false
    this.setState(this.state)
  },
  annuleRencontre: function() {
    console.info("Annulation de l'ajout d'une rencontre.")
    this.state.ajoutRencontre = false
    this.setState(this.state)
  },
  render() {
    let modeAjout = true
    // Affichage de la liste des rencontres
    let modeListe = !this.state.recontre && !this.state.ajoutRencontre
    console.info("Mode liste ?" + modeListe)
    //console.info("Raffraichissement: " + JSON.stringify(this.state))
    var liRencontres = this.state.rencontres.map(rencontre => {
      return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    })
    let panneauAjout = (
      <Card>
        <CardText>
          <DatePicker hintText="Date de la rencontre" container="inline"/>
          <br/>
          <TextField hintText="Hote"/><br/>
          <br/>
          <TextField hintText="Visiteur"/><br/>
          <br/>
          <FlatButton label="Ajouter"/>
          <FlatButton label="Annuler" onMouseDown={this.annuleRencontre}/>
        </CardText>
      </Card>
    )
    const style = {
      marginRight: 20
    }
    return (
      <div>
        <AppBar title="Rencontres" onClick={this.listerRencontres} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <FloatingActionButton onMouseDown={this.ajoutRencontre} style={style}>
          <ContentAdd/>
        </FloatingActionButton>
        <section>
          {this.state.ajoutRencontre
            ? panneauAjout
            : null}
          <Card>
            <CardText>
              <List>
                {modeListe
                  ? liRencontres
                  : null}
              </List>
            </CardText>
          </Card>
          <Card>
            <div>
              {this.state.rencontre
                ? <Tableau rencontre={this.state.rencontre.id}/>
                : null}
            </div>
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
