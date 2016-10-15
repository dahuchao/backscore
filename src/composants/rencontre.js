import React from "react"
import { Link } from 'react-router'
import {
  AppBar,
  Card,
  IconButton,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TextField,
  DatePicker
} from "material-ui"
import NavigationClose from "material-ui/svg-icons/navigation/close"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import Tableau from "./tableau"
import areIntlLocalesSupported from "intl-locales-supported"

const Rencontre = React.createClass({
  getInitialState: function () {
    let rencontre = this.props.rencontre
    let date = rencontre.date ? rencontre.date : new Date()
    return { date: date, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom }
  },
  majDate: function (x, date) {
    this.setState({ date: date })
    // console.debug("MAJ date: " + JSON.stringify(this.state))
  },
  majHote: function (e) {
    this.setState({ hote: e.target.value })
    // console.info("MAJ Hote: " + JSON.stringify(this.state))
  },
  majVisiteur: function (e) {
    this.setState({ visiteur: e.target.value })
    // console.info("MAJ visiteur: " + JSON.stringify(this.state))
  },
  sauver: function () {
    this.props.sauver(this.state)
  },
  render: function () {
    let labelBouton = this.props.modeEdition ? "Sauver" : "Edition"
    console.debug("Conteneur2.")
    return this.props.modeEdition ? (
      <div>
        <AppBar title="Edition rencontre"
          iconElementLeft={<IconButton onClick={this.sauver}><NavigationArrowBack /></IconButton>} />
        <Card >
          <CardText>
            <DatePicker floatingLabelText="Date de la rencontre"
              defaultDate={new Date(this.props.rencontre.date)}
              onChange={this.majDate} /><br />
            <TextField floatingLabelText="Club Hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={this.majHote} /><br />
            <TextField floatingLabelText="Club Visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={this.majVisiteur} /><br />
          </CardText>
        </Card >
      </div>
    ) : (
        <div>
          <AppBar title={'Rencontre ' + this.props.rencontre.date}
            iconElementLeft={
              <Link to="/rencontres">
                <IconButton>
                  <NavigationArrowBack />
                </IconButton>
              </Link>}
            iconElementRight={<FlatButton label={labelBouton} onClick={this.props.editer} />}
            />
          <Tableau
            rencontre={this.props.rencontre}
            surNouvelleMarque={this.props.surNouvelleMarque}
            surPeriode={this.props.surPeriode} />
        </div>
      )
  }
})

export default Rencontre
