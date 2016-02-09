import React from 'react'
import Marque from "./marque.js"
import Equipe from "./equipe.js"

class Tableau extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hote: {
        nom: "NEC",
        marque: 21
      },
      visiteur: {
        nom: "USJA",
        marque: 17
      }
    }
    console.info("sur panier marque " + JSON.stringify(this.state));
    this.surPanierHote = () => {
      var marque = this.state.hote.marque
      console.info("marque avant: " + JSON.stringify(marque));
      this.state.hote.marque=marque+1
      console.info("marque apres: " + JSON.stringify(this.state.hote.marque));
      this.setState(this.state);
    }
    this.surPanierVisiteur = () => {
      console.info("sur panier marque");
    }
    this.surCorrection = () => {
      console.info("sur correction");
    }
  }
  render() {
    return (
      <div id="tableau">
        <Equipe nom={this.state.hote.nom} surPanier={this.surPanierHote}/>
        <Marque hote={this.state.hote.marque} visiteur={this.state.visiteur.marque} surCorrection={this.surCorrection}/>
        <Equipe nom={this.state.visiteur.nom} surPanier={this.props.surPanierVisiteur}/>
      </div>
    )
  }
}

export default Tableau;
