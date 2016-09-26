import React from "react"
import { AppBar,
  Card,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TextField,
  DatePicker } from "material-ui"

const RencontreAjout = React.createClass({
  getInitialState: function () {
    let rencontre = this.props.rencontre
    return { date: rencontre.date, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom }
  },
  majDate: function (e) {
    this.setState({ date: e.target.value })
  },
  majHote: function (e) {
    this.setState({ hote: e.target.value })
    console.info("Info: " + JSON.stringify(this.state))
  },
  majVisiteur: function (e) {
    this.setState({ visiteur: e.target.value })
    console.info("Info: " + JSON.stringify(this.state))
  },
  sauver: function () {
    this.props.ajoutRencontre(this.state)
  },
  render: function () {
    return (
      <div>
        <AppBar title="Ajouter rencontre"
          iconElementRight={<FlatButton label="Sauver" />}/>
        <Card>
          <CardText>
            <DatePicker defaultValue={this.props.rencontre.date} onChange={this.majDate} hintText="Date de la rencontre"/>
            <TextField defaultValue={this.props.rencontre.hote.nom} onChange={this.majHote} hintText="Hote"/><br/>
            <TextField defaultValue={this.props.rencontre.visiteur.nom} onChange={this.majVisiteur} hintText="Visiteur"/><br/>
            <RaisedButton onClick={this.sauver} primary={true} label="Ajouter"/>
          </CardText>
        </Card>
      </div>
    )
  }
})

export default RencontreAjout
