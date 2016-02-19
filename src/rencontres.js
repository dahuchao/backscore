import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import Tableau from "./tableau.js"
var request = require('request');

var Rencontre = React.createClass({
  rencontreSelectionnee: function() {
    console.info("Rencontre selectionnee: " + JSON.stringify(this.props.rencontre));
    this.props.surSelectionRencontre(this.props.rencontre)
  },
  render() {
    var rencontre = this.props.rencontre
    var versus = rencontre.id + "/ " + rencontre.hote.nom + "-" + rencontre.visiteur.nom
    return (
      <div>
        <ListItem leftAvatar={<Avatar icon={<FileFolder/>}/>} primaryText={versus} secondaryText="18 janvier 2016" rightIcon={<ActionInfo/>} onClick={this.rencontreSelectionnee}/>
      </div>
    )
  }
})
var Rencontres = React.createClass({
  getInitialState: function() {
    request('/api/rencontres',this.ref)
    return {
      rencontres:[],
      rencontre:null
    }
  },
  ref:function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.info("Initialisation des rencontres " + JSON.stringify(body))
      this.state.rencontres = JSON.parse(body)
      this.setState(this.state);
    }
  },
  rencontreSelectionnee: function(rencontre) {
    console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
    this.state.rencontre = rencontre
    this.setState(this.state)
    console.info("Etat rencontre: " + JSON.stringify(this.state))
  },
  render() {
    //console.info("Raffraichissement: " + this.state.rencontre.id)
    console.info("Raffraichissement: " + JSON.stringify(this.state))
    var liRencontres = this.state.rencontres.map(rencontre => {
      return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    })
    return (
      <div>
        <List>
          {liRencontres}
        </List>
        { this.state.rencontre ? <Tableau rencontre={this.state.rencontre.id}/> : null }
      </div>
    )
  }
})

export default Rencontres
