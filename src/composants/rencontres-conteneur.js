import React from 'react'
import ReactDOM from 'react-dom'
import * as types from '../actions/actions-types'
import { connect } from 'react-redux'
import request from 'request'
import store from '../store'
import Rencontres from './rencontres';

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

  listerRencontres: function (error, response, rencontres) {
    this.state.rencontre = null
    if (!error && response.statusCode == 200) {
      console.info("Initialisation des rencontres " + rencontres)
      let rrencontres = JSON.parse(rencontres)
      this.setState({ rencontres: rrencontres })
    }
    this.setState(this.state)
  },
  ajoutRencontre: function (rencontre) {
    console.info("Ajout d'une rencontre: " + JSON.stringify(rencontre))
  },

  render: function () {
    return <Rencontres rencontres={this.props.rencontres}/>
  }
})

const mapStateToProps = function (store) {
  console.log(store.rencontreState)
  return {
    rencontres: store.rencontreState.rencontres
  }
}

export default connect(mapStateToProps)(RencontresConteneur);
