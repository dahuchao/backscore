import React from "react"
import { AppBar,
  Card,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TextField,
  DatePicker } from "material-ui/lib"

const RencontreAjout = React.createClass({
  render: function () {
    return (
      <div>
        <AppBar title="Ajouter rencontre"
          iconElementRight={<FlatButton label="Sauver" />}/>
        <Card>
          <CardText>
            <DatePicker value={this.props.rencontre.date} hintText="Date de la rencontre"/>
            <TextField value={this.props.rencontre.hote.nom} hintText="Hote"/><br/>
            <TextField value={this.props.rencontre.visiteur.nom} hintText="Visiteur"/><br/>
            <RaisedButton onClick={this.props.ajoutRencontre} primary={true} label="Ajouter"/>
          </CardText>
        </Card>
      </div>
    )
  }
})

export default RencontreAjout
