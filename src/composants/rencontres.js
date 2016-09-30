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
                console.info("dqte Rencontres: " + JSON.stringify(rencontre.date))
                return (
                  <ListItem
                    key={rencontre.id}
                    leftAvatar={
                      <Link style={styleRencontre}
                        key={rencontre.id} to={'/rencontres/' + rencontre.id}>
                        <Avatar icon={<FileFolder/>}/>
                      </Link>
                    }
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText={rencontre.date ? rencontre.date : "date à préciser"}
                    rightIcon={<ActionInfo/>}
                    rightIconButton={
                      <RaisedButton onClick={ this.props.supprimeRencontre.bind(null, rencontre.id) }
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
