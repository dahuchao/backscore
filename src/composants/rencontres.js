import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import { Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const Rencontres = React.createClass({
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
            <FloatingActionButton style={style}
              onMouseDown={this.props.ajoutRencontre}>
              <ContentAdd/>
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <CardText>
            <List>
              {this.props.rencontres.map(rencontre => {
                return (
                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder/>}/>}
                    primaryText={
                      <Link to={'/rencontres/' + rencontre.id}>
                        {rencontre.hote.nom}
                      </Link>
                    }
                    secondaryText="18 janvier 2016"
                    rightIcon={<ActionInfo/>}
                    rightIconButton={
                      <RaisedButton label="Supprimer" primary={true} />
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
