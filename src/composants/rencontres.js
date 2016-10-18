import React from "react"
import { Link } from "react-router"
import {
  AppBar,
  Card,
  CardText,
  List,
  ListItem,
  RaisedButton,
  Avatar,
  FloatingActionButton,
  TextField,
  DatePicker
} from "material-ui"
import ActionInfo from "material-ui/svg-icons/action/info"
import FileFolder from "material-ui/svg-icons/file/folder"
import ContentAdd from "material-ui/svg-icons/content/add"

const Rencontres = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  preparationDate(date) {
    let dateRencontre = new Date(date)
    console.debug("date Rencontres: " + JSON.stringify(dateRencontre))
    let jour = new Date()
    let strdate = !dateRencontre ?
      "date à préciser" :
      dateRencontre < jour ?
        `${jour.toLocaleDateString()}` :
        `${dateRencontre.toLocaleDateString()} ${dateRencontre.getHours()}:${dateRencontre.getMinutes()}`
    return strdate
  },
  zoom(idRencontre) {
    console.debug(`Ouverture de la rencontre: ${idRencontre}`)
    this.context.router.push(`/rencontres/${idRencontre}`)
  },
  render() {
    const style = {
      marginRight: 20
    }
    const styleRencontre = {
      textDecoration: 'none'
    }
    return (
      <div>
        <AppBar title="BACKSCORE"
          onClick={this.props.listerRencontres}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <FloatingActionButton style={style}
              onMouseDown={this.props.ajouterRencontre}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <CardText>
            <List id="rencontres" >
              {this.props.rencontres.map(rencontre => {
                let strdate = this.preparationDate(rencontre.date)
                return (
                  <ListItem
                    key={rencontre.id}
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText={strdate}
                    onTouchTap={this.zoom.bind(this,rencontre.id)}
                    rightIcon={<ActionInfo />}
                    rightIconButton={
                      <RaisedButton onClick={this.props.supprimeRencontre.bind(null, rencontre.id)}
                        label="Supprimer" primary={true} />
                    }
                    />
                )
              })}
            </List>
          </CardText>
        </Card>
      </div>
    )
  }
})
export default Rencontres;
