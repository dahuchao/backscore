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
} from "material-ui/lib"
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const Rencontres = React.createClass({
  getInitialState: function () {
    return { hote: "", visiteur: "", date: new Date() }
  },
  render: function () {
    const style = {
      marginRight: 20
    }
    return (
      <div>
        <AppBar title="BACKSCORE"
          onClick={this.props.listerRencontres}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <Link to="/rencontres-plus">
              <FloatingActionButton style={style}
                onMouseDown={this.props.ajoutRencontre}>
                <ContentAdd/>
              </FloatingActionButton>
            </Link>
          </div>
        </AppBar>
        <Card>
          <CardText>
            <List>
              {this.props.rencontres.map(rencontre => {
                return (
                  <Link to={'/rencontres/' + rencontre.id}>
                    <ListItem
                      leftAvatar={<Avatar icon={<FileFolder/>}/>}
                      primaryText={
                        rencontre.hote.nom
                      }
                      secondaryText="18 janvier 2016"
                      rightIcon={<ActionInfo/>}
                      rightIconButton={
                        <RaisedButton label="Supprimer" primary={true} />
                      }/>
                  </Link>
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
