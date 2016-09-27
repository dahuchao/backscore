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
            <DatePicker defaultValue={this.props.rencontre.date} onChange={this.majDate} hintText="Date de la rencontre"/>
            <TextField defaultValue={this.props.rencontre.hote.nom} onChange={this.majHote} hintText="Hote"/><br/>
            <TextField defaultValue={this.props.rencontre.visiteur.nom} onChange={this.majVisiteur} hintText="Visiteur"/><br/>
          </CardText>
        </Card >
      </div>
    ) : (
        <div>
          <AppBar title="Rencontre"
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
