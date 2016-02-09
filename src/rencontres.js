import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
import Tableau from "./tableau.js"

let rencontres = [
  {
    id:1,
    hote: {
      nom: "NEC",
      marque: 21
    },
    visiteur: {
      nom: "USJA",
      marque: 18
    }
  },
  {
    id:2,
    hote: {
      nom: "NEC",
      marque: 46
    },
    visiteur: {
      nom: "Montaigu",
      marque: 24
    }
  },
  {
    id:3,
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

class Rencontre extends React.Component {
  constructor(props) {
    super(props)
    console.info("Rencontre: " + JSON.stringify(this.props.rencontre))
    this.rencontreSelectionnee = () => {
      console.info("Rencontre selectionnee: " + JSON.stringify(this.props.rencontre));
      this.props.surSelectionRencontre(this.props.rencontre)
    }
  }
  render() {
    var rencontre = this.props.rencontre
    var versus = rencontre.id + "/ " + rencontre.hote.nom + "-" + rencontre.visiteur.nom
    return (
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText={versus}
        secondaryText="18 janvier 2016"
        rightIcon={<ActionInfo />}
        onClick={this.rencontreSelectionnee}
      />
    )
  }
}
export default class Rencontres extends React.Component {
  constructor(props) {
    super(props)
    console.info("sur panier marque " + JSON.stringify(this.state))
    //this.state={rencontre:rencontres[0]}
    this.rencontreSelectionnee = (rencontre) => {
      console.info("Rencontre selectionnee: " + JSON.stringify(rencontre))
      this.state = {rencontre: rencontre}
    }
  }
  render() {
    var liRencontres = rencontres.map(rencontre => {
      return (
        <Rencontre
          rencontre={rencontre}
          surSelectionRencontre={this.rencontreSelectionnee}
        />
      );
    });
    return (
      <div>
        <List>
          {liRencontres}
        </List>
        <Tableau
          rencontre={this.state.rencontre}
          />
      </div>
    )
  }
}
