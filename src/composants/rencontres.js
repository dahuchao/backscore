import React from "react"
import { Link } from "react-router"
import {
  AppBar,
  Card,
  CardText,
  IconButton,
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
import ActionDelete from "material-ui/svg-icons/action/delete"

const Rencontres = React.createClass({
  preparationDate(date) {
    let dateRencontre = new Date(date)
    console.debug("date Rencontres: " + JSON.stringify(dateRencontre))
    let jour = new Date()
    let strdate
    !dateRencontre ?
      strdate = "date à préciser" :
      dateRencontre < jour ?
        strdate = `${jour.toLocaleDateString()}` :
        strdate = `${dateRencontre.toLocaleDateString()} ${dateRencontre.getHours()}:${dateRencontre.getMinutes()}`
    return strdate
  },
  fonct() {
    console.debug("lien.")
    // this.context.router.push("/rencontres/2")
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
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText={strdate}
                    onKeyboardFocus={this.fonct}
                    rightIconButton={
                      <IconButton
                        onClick={this.props.supprimeRencontre.bind(null, rencontre.id)}>
                        <ActionDelete />
                      </IconButton>}
                    >
                    <Link to={"/rencontres/" + rencontre.id} />
                  </ListItem>
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
