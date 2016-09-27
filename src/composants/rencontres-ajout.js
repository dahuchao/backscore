import React from "react"
import { AppBar,
  Card,
  IconButton,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TextField,
  DatePicker } from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"

const RencontreAjout = React.createClass({
  getInitialState: function () {
    let rencontre = this.props.rencontre
    return { date: rencontre.date, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom }
  },
  majDate: function (x, date) {
    this.setState({ date: date })
    console.info("Ajout date: " + JSON.stringify(this.state))
  },
  majHote: function (e) {
    this.setState({ hote: e.target.value })
    console.info("Ajout hote: " + JSON.stringify(this.state))
  },
  majVisiteur: function (e) {
    this.setState({ visiteur: e.target.value })
    console.info("Ajout visiteur: " + JSON.stringify(this.state))
  },
  sauver: function () {
    this.props.ajoutRencontre(this.state)
  },
  render: function () {
    return (
      <div>
        <AppBar title="Ajouter rencontre"
          iconElementLeft={<IconButton onClick={this.sauver}><NavigationArrowBack/></IconButton>} />
        <Card>
          <CardText>
            <DatePicker defaultValue={this.props.rencontre.date} onChange={this.majDate} hintText="Date de la rencontre"/>
            <TextField defaultValue={this.props.rencontre.hote.nom} onChange={this.majHote} hintText="Hote"/><br/>
            <TextField defaultValue={this.props.rencontre.visiteur.nom} onChange={this.majVisiteur} hintText="Visiteur"/><br/>
          </CardText>
        </Card>
      </div>
    )
  }
})

export default RencontreAjout
