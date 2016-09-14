import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import store from '../store'
import request from 'request'
import Tableau from "./tableau-vue.js"
import AppBar from 'material-ui/lib/app-bar'
import {IconButton} from "material-ui"
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back"
import * as types from '../actions/actions-types'

const RencontreConteneur = React.createClass({
  componentDidMount: function () {
    const idRencontre = this.props.params.idRencontre
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Chargement rencontre : " + rencontre)
        let oRencontre = JSON.parse(rencontre)
        store.dispatch({
          type: types.GET_RENCONTRE_SUCCESS,
          rencontre: oRencontre
        })
      }
    })
  },
  render: function () {
    return (
      <div>
        <AppBar title="Rencontre"
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}>
        </AppBar>
        <Tableau rencontre={this.props.rencontre}/>
        {this.props.children}
      </div>
    )
  }
})
const mapStateToProps = function (store) {
  return {
    rencontre: store.rencontreState.rencontre
  }
}

export default connect(mapStateToProps)(RencontreConteneur);
