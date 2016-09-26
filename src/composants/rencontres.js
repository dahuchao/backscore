import React from "react"
import { Link } from "react-router"
import {AppBar,
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
import ActionInfo from 'material-ui/svg-icons/action/info'
import FileFolder from 'material-ui/svg-icons/file/folder'
import ContentAdd from 'material-ui/svg-icons/content/add'

const Rencontres = React.createClass({
  getInitialState: function () {
    return { hote: "", visiteur: "", date: new Date() }
  },
  render: function () {
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
              <ContentAdd/>
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <CardText>
            <List id="rencontres" >
              {this.props.rencontres.map(rencontre => {
                return (
                  <ListItem
                    key={rencontre.id}
                    value={rencontre}
                        onClick={this.props.ouvrirEdition}
                    leftAvatar={
                      <Link style={styleRencontre}
                        key={rencontre.id} to={'/rencontres/' + rencontre.id}>
                        <Avatar icon={<FileFolder/>}/>
                      </Link>
                    }
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText="18 janvier 2016"
                    rightIcon={<ActionInfo/>}
                    rightIconButton={
                      <RaisedButton
                        label="Supprimer" primary={true} />
                    }/>
                )
              }) }
            </List>
          </CardText>
        </Card>
      </div>
    )
  }
})
export default Rencontres;
