import React from "react"
import Marque from "./tableau-marque.js"
import Equipe from "./tableau-equipe.js"
import store from "../store"
import io from "socket.io-client"
import request from "request"
import * as types from "../actions/actions-types"

var Tableau = React.createClass({
  componentWillMount: function () {
    var adresse = location.href
    console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    this.socket.on("connect", this.connexionTableMarque)
  },
  componentWillUnmount: function () {
    const idRencontre = this.props.rencontre.id
    console.info("Fermeture tableau rencontre " + idRencontre)
    this.socket.emit("fermerRencontre", idRencontre)
  },
  connexionTableMarque: function () {
    console.info("Connecté avec la table de marque")
    const idRencontre = this.props.rencontre.id
    // console.info("Identifiant rencontre: " + idRencontre)
    this.socket.emit("ouvrirRencontre", idRencontre)
    this.socket.on("nouvelleMarque", this.surNouvelleMarque)
  },
  ouvertureRencontre: function (idRencontre) {
    // console.info("Ouverture rencontre " + idRencontre)
    this.socket.emit("ouvrirRencontre", idRencontre)
  },
  surNouvelleMarque: function (rencontre) {
    // console.debug("Reception d'une nouvelle marque: " + JSON.stringify(rencontre))
    store.dispatch({
      type: types.NOUVELLE_MARQUE,
      rencontre: rencontre
    })
  },
  surPanierHote: function () {
    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.hote.marque))
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque + 1
    this.socket.emit('panierMarque', this.props.rencontre)
  },
  surPanierVisiteur: function () {
    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.visiteur.marque))
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque + 1
    this.socket.emit('panierMarque', this.props.rencontre)
  },
  surCorrectionHote: function () {
    // console.info("Correction de la marque");
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque - 1
    this.socket.emit('panierMarque', this.props.rencontre)
  },
  surCorrectionVisiteur: function () {
    // console.info("Correction de la marque")
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque - 1
    this.socket.emit('panierMarque', this.props.rencontre)
  },
  render: function () {
    this.ouvertureRencontre(this.props.rencontre.id)
    return (
      <div id="tableau">
        <Equipe
          nom={this.props.rencontre.hote.nom}
          surPanier={this.surPanierHote} />
        <Marque
          hote={this.props.rencontre.hote.marque}
          visiteur={this.props.rencontre.visiteur.marque}
          rencontre={this.props.rencontre}
          surCorrectionHote={this.surCorrectionHote}
          surCorrectionHote={this.surCorrectionHote}
          surCorrectionVisiteur={this.surCorrectionVisiteur} />
        <Equipe
          nom={this.props.rencontre.visiteur.nom}
          surPanier={this.surPanierVisiteur} />
      </div>
    )
  }
})

export default Tableau
