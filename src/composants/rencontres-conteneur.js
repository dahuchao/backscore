import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import request from 'request'
import * as types from '../actions/actions-types'
import store from '../store'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import { Link } from 'react-router';

const RencontresConteneur = React.createClass({
  componentDidMount: function () {
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontres) {
      if (!error && response.statusCode == 200) {
        console.info("Initialisation des rencontres " + rencontres)
        let oRencontres = JSON.parse(rencontres)
        store.dispatch({
          type: types.GET_RENCONTRES_SUCCESS,
          rencontres: oRencontres
        })
      }
    })
  },

  render: function () {
    return (
      <div>
        <Card>
          <CardText>
            <List>
              {this.props.rencontres.map(rencontre => {
                return (
                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder/>}/>}
                    primaryText={
                      <Link to={'/rencontres/' + rencontre.id}>{rencontre.hote.nom}</Link>
                    }
                    secondaryText="18 janvier 2016"
                    rightIcon={<ActionInfo/>}
                    rightIconButton={<RaisedButton
                      label="Supprimer"
                      primary={true} />}/>
                )
              }) }
            </List>
          </CardText>
        </Card>
        {this.props.children }
      </div>
    )
  }
})

const mapStateToProps = function (store) {
  console.log(store.rencontreState)
  return {
    rencontres: store.rencontreState.rencontres
  }
}

export default connect(mapStateToProps)(RencontresConteneur);
