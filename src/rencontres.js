import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import Tableau from "./tableau.js"
// import request from 'request';
// import restful, { requestBackend } from 'restful.js';
//
// const api = restful('http://api.example.com', requestBackend(request));

let rencontres = [
  {
    id: 1,
    hote: {
      nom: "NEC",
      marque: 21
    },
    visiteur: {
      nom: "USJA",
      marque: 19
    }
  }, {
    id: 2,
    hote: {
      nom: "NEC",
      marque: 46
    },
    visiteur: {
      nom: "Montaigu",
      marque: 24
    }
  }, {
    id: 3,
    hote: {
      nom: "NEC",
      marque: 54
    },
    visiteur: {
      nom: "Coulaine",
      marque: 28
    }
  }
]

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
    console.info("sur panier marque " + JSON.stringify(this.state))
    return {
      rencontre: rencontres[0]
    }
  },
  rencontreSelectionnee: function(rencontre) {
    console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
    this.state = {
      rencontre: rencontre
    }
    this.setState(this.state)
    console.info("Etat rencontre: " + JSON.stringify(this.state))
  },
  render() {
    console.info("Raffraichissement: " + JSON.stringify(this.state))
    var liRencontres = rencontres.map(rencontre => {
      return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    });
    return (
      <div>
        <List>
          {liRencontres}
        </List>
        <Tableau rencontre={this.state.rencontre.id}/>
      </div>
    )
  }
})

export default Rencontres
