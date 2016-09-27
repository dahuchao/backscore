import React from "react"
import { Link } from 'react-router'
import { AppBar,
  Card,
  IconButton,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TextField,
  DatePicker } from "material-ui"
import NavigationClose from "material-ui/svg-icons/navigation/close"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import Tableau from "./tableau"
import areIntlLocalesSupported from "intl-locales-supported"

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}

const Rencontre = React.createClass({
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
    this.props.sauver(this.state)
  },
  render: function () {
    let labelBouton = this.props.modeEdition ? "Sauver" : "Edition"
    return this.props.modeEdition ? (
      <div>
        <AppBar title="Edition rencontre"
          iconElementLeft={<IconButton onClick={this.sauver}><NavigationArrowBack/></IconButton>} />
        <Card >
          <CardText>
            <DatePicker hintText="Date de la rencontre"
              // value={this.props.rencontre.date}
              onChange={this.majDate}
              okLabel="OK"
              cancelLabel="Annuler"
              DateTimeFormat={DateTimeFormat}
              />
            <TextField hintText="Hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={this.majHote} /><br/>
            <TextField hintText="Visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={this.majVisiteur} /><br/>
          </CardText>
        </Card >
      </div>
    ) : (
        <div>
          <AppBar title={'Rencontre ' + this.props.rencontre.date}
            iconElementLeft={
              <Link to="/rencontres">
                <IconButton>
                  <NavigationArrowBack/>
                </IconButton>
              </Link>}
            iconElementRight={<FlatButton label={labelBouton} onClick={this.props.editer} />}
            />
          <Tableau rencontre={this.props.rencontre}/>
        </div>
      )
  }
})

export default Rencontre
