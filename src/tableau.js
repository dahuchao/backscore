import React from 'react'
import Marque from "./marque.js"
import Equipe from "./equipe.js"
import io from "socket.io-client"
import request from "request"

var Tableau = React.createClass({
  getInitialState: function() {
    var adresse = location.href
    console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    console.info("Tableau de la rencontre " + JSON.stringify(this.props.rencontre))
    this.socket.on('connect', function() {
      console.info("Connecté avec la table de marque")
    })
    this.socket.on('nouvelleMarque', this.surNouvelleMarque)
    var rencontreCourante = {
      rencontre: {
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
    return rencontreCourante
  },
  connexionTableMarque: function(idRencontre) {
    console.info("Connexion à la table de marque: " + JSON.stringify(idRencontre))
    var adresse = location.href + "api/rencontres/" + this.props.rencontre
    console.info("Requete de l'API web: " + adresse)
    request(adresse, this.surInitialisationMarque)
  },
  surInitialisationMarque: function(error, response, rencontre) {
    console.info("Reception première marque" + rencontre)
    this.state.rencontre = JSON.parse(rencontre)
    this.setState(this.state)
  },
  surNouvelleMarque: function(marque) {
    console.info("Reception d'une nouvelle marque: " + + JSON.stringify(marque))
  },
  surPanierHote: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.rencontre.hote.marque))
    let marque = this.state.rencontre.hote.marque
    this.state.rencontre.hote.marque = marque + 1
    this.setState(this.state)
    this.socket.emit('panierMarque', this.state.rencontre)
  },
  surPanierVisiteur: function() {
    console.info("Panier marque: " + JSON.stringify(this.state.rencontre.visiteur.marque))
    let marque = this.state.rencontre.visiteur.marque
    this.state.rencontre.visiteur.marque = marque + 1
    this.setState(this.state)
    this.socket.emit('panierMarque', this.state.rencontre)
  },
  surCorrectionHote: function() {
    console.info("Correction de la marque");
    let marque = this.state.rencontre.hote.marque
    this.state.rencontre.hote.marque = marque - 1
    this.setState(this.state)
    this.socket.emit('panierMarque', this.state.rencontre)
  },
  surCorrectionVisiteur: function() {
    console.info("Correction de la marque")
    let marque = this.state.rencontre.visiteur.marque
    this.state.rencontre.visiteur.marque = marque - 1
    this.setState(this.state)
    this.socket.emit('panierMarque', this.state.rencontre)
  },
  render: function() {
    //console.info("if (" + this.props.rencontre + " != " + this.state.rencontre.id + ")")
    if (this.props.rencontre != this.state.rencontre.id) {
      this.connexionTableMarque(this.props.rencontre)
    }
    return (
      <div id="tableau">
        <Equipe nom={this.state.rencontre.hote.nom} surPanier={this.surPanierHote}/>
        <Marque hote={this.state.rencontre.hote.marque} visiteur={this.state.rencontre.visiteur.marque} surCorrectionHote={this.surCorrectionHote} surCorrectionVisiteur={this.surCorrectionVisiteur}/>
        <Equipe nom={this.state.rencontre.visiteur.nom} surPanier={this.surPanierVisiteur}/>
      </div>
    )
  }
})

export default Tableau
