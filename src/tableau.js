import React from 'react'
import Marque from "./marque.js"
import Equipe from "./equipe.js"
var socket = require('socket.io-client')('http://localhost')

var Tableau = React.createClass({
  getInitialState: function() {
    console.info("Taleau de la rencontre " + JSON.stringify(this.props.rencontre))
    var rencontreCourante = {
      rencontre:{
        "id": 0,
        "hote": {
          "nom": "hote",
          "marque": 1
        },
        "visiteur": {
          "nom": "visiteur",
          "marque": 1
        }
      }
    }
    socket.on('connect', function() {
      console.info("Connecté avec la table de marque");
    })
    socket.on('fournitureRencontre', this.surPremiereMarque)
    socket.on('nouvelleMarque', this.surNouvelleMarque)
    return rencontreCourante
  },
  connexionTableMarque: function(idRencontre) {
    console.info("Connexion à la table de marque" + JSON.stringify(idRencontre));
    socket.emit('ouvrirRencontre', idRencontre);
  },
  surPremiereMarque: function(rencontre) {
    console.info("Reception première marque" + JSON.stringify(rencontre));
    this.state.rencontre = rencontre
    //this.state.rencontre.hote.nom = rencontre.hote.nom
    //this.state.rencontre.hote.marque = rencontre.hote.marque
    //this.state.rencontre.visiteur.nom = rencontre.visiteur.nom
    //this.state.rencontre.visiteur.marque = rencontre.visiteur.marque
    this.setState(this.state)
    console.info("-Marque:" + JSON.stringify(this.state))
  },
  surNouvelleMarque: function(marque) {
    console.info("Reception d'une nouvelle marque: " + + JSON.stringify(marque))
  },
  surPanierHote: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.rencontre.hote.marque))
    let marque = this.state.rencontre.hote.marque
    this.state.rencontre.hote.marque = marque + 1
    this.setState(this.state)
    socket.emit('panierMarque', this.state.rencontre.hote.marque);
    console.info("-Marque: " + JSON.stringify(this.state.rencontre.hote.marque))
  },
  surPanierVisiteur: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.rencontre.visiteur.marque))
    let marque = this.state.rencontre.visiteur.marque
    this.state.rencontre.visiteur.marque = marque + 1
    this.setState(this.state)
    console.info("-Marque: " + JSON.stringify(this.state.rencontre.visiteur.marque))
  },
  surCorrectionHote: function() {
    console.info("Correction de la marque");
    let marque = this.state.rencontre.hote.marque
    this.state.rencontre.hote.marque = marque - 1
    this.setState(this.state)
    socket.emit('panierMarque', this.state.rencontre.hote.marque);
    console.info("-Marque: " + JSON.stringify(this.state.rencontre.hote.marque))
  },
  surCorrectionVisiteur: function() {
    console.info("Correction de la marque");
    let marque = this.state.rencontre.visiteur.marque
    this.state.rencontre.visiteur.marque = marque - 1
    this.setState(this.state)
    console.info("-Marque: " + JSON.stringify(this.state.rencontre.visiteur.marque))
  },
  render: function() {
    // Si la rencontre a changé
    console.info("if: "+ JSON.stringify(this.props.rencontre)+"=" + JSON.stringify(this.state.rencontre.id))
    if (this.props.rencontre != this.state.rencontre.id)
    {
      this.connexionTableMarque(this.props.rencontre)
    }
    return (
      <div id="tableau">
        <Equipe nom={this.state.rencontre.hote.nom} surPanier={this.surPanierHote}/>
        <Marque hote={this.state.rencontre.hote.marque} visiteur={this.state.rencontre.visiteur.marque} surCorrectionHote={this.surCorrectionHote} surCorrectionVisiteur={this.surCorrectionVisiteur}/>
        <Equipe nom={this.state.rencontre.visiteur.nom} surPanier={this.props.surPanierVisiteur}/>
      </div>
    )
  }
})

export default Tableau
