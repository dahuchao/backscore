import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import Rencontre from "./rencontre.js"

var RencontreEdition = React.createClass({
  getInitialState: function() {
    //this.rencontre =
    //return {rencontre: this.props.rencontre}
    return {hote: this.props.rencontre.hote.nom, visiteur: this.props.rencontre.visiteur.nom}
  },
  handleHote: function(e) {
    this.setState({hote: e.target.value});
  },
  handleVisiteur: function(e) {
    this.setState({visiteur: e.target.value});
  },
  ajoutRencontre: function() {
    this.rencontre.hote.nom = this.state.hote
    this.rencontre.visiteur.nom = this.state.visiteur
    console.info("Rencontre :" + JSON.stringify(this.state.rencontre))
    this.props.onAjout(rencontre)
  },
  render() {
    return (
      <Card>
        <CardText>
            <DatePicker hintText="Date de la rencontre" container="inline"/>
            <TextField value={this.state.hote} onChange={this.handleHote} hintText="Hote"/><br/>
            <TextField value={this.state.visiteur} onChange={this.handleVisiteur} hintText="Visiteur"/><br/>
            <RaisedButton onClick={this.ajoutRencontre} primary={true} label="Ajouter"/>
        </CardText>
      </Card>
    )
  }
})

export default RencontreEdition
