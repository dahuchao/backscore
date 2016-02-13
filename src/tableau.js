import React from 'react'
import Marque from "./marque.js"
import Equipe from "./equipe.js"
var socket = require('socket.io-client')('http://localhost')

var Tableau = React.createClass({
  getInitialState: function() {
    console.info("Taleau de la rencontre " + JSON.stringify(this.props.rencontre))
    let idRencontre = this.props.rencontre;
    socket.on('connect', function() {
      console.info("Connecté avec la table de marque");
      socket.emit('ouvrirRencontre', idRencontre);
    })
    socket.on('fournitureRencontre', this.surPremiereMarque)
    socket.on('nouvelleMarque', this.surNouvelleMarque)
    return {
      "id": 1,
      "hote": {
        "nom": "hote",
        "marque": 1
      },
      "visiteur": {
        "nom": "visiteur",
        "marque": 1
      }
    }
  },
  surPremiereMarque: function(rencontre) {
    console.info("Reception première marque" + JSON.stringify(rencontre));
    this.state.hote.nom = rencontre.hote.nom
    this.state.hote.marque = rencontre.hote.marque
    this.state.visiteur.nom = rencontre.visiteur.nom
    this.state.visiteur.marque = rencontre.visiteur.marque
    this.setState(this.state)
    console.info("-Marque:" + JSON.stringify(this.state))
  },
  surNouvelleMarque: function(marque) {
    console.info("Reception d'une nouvelle marque: " + + JSON.stringify(marque))
  },
  surPanierHote: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.hote.marque))
    let marque = this.state.hote.marque
    this.state.hote.marque = marque + 1
    this.setState(this.state)
    socket.emit('panierMarque', this.state.hote.marque);
    console.info("-Marque: " + JSON.stringify(this.state.hote.marque))
  },
  surPanierVisiteur: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.visiteur.marque))
    let marque = this.state.visiteur.marque
    this.state.visiteur.marque = marque + 1
    this.setState(this.state)
    console.info("-Marque: " + JSON.stringify(this.state.visiteur.marque))
  },
  surCorrectionHote: function() {
    console.info("Correction de la marque");
    let marque = this.state.hote.marque
    this.state.hote.marque = marque - 1
    this.setState(this.state)
    socket.emit('panierMarque', this.state.hote.marque);
    console.info("-Marque: " + JSON.stringify(this.state.hote.marque))
  },
  surCorrectionVisiteur: function() {
    console.info("Correction de la marque");
    let marque = this.state.visiteur.marque
    this.state.visiteur.marque = marque - 1
    this.setState(this.state)
    console.info("-Marque: " + JSON.stringify(this.state.visiteur.marque))
  },
  render: function() {
    return (
      <div id="tableau">
        <Equipe nom={this.state.hote.nom} surPanier={this.surPanierHote}/>
        <Marque hote={this.state.hote.marque} visiteur={this.state.visiteur.marque} surCorrectionHote={this.surCorrectionHote} surCorrectionVisiteur={this.surCorrectionVisiteur}/>
        <Equipe nom={this.state.visiteur.nom} surPanier={this.surPanierVisiteur}/>
      </div>
    )
  }
})

export default Tableau
