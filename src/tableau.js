import React from 'react'
import Marque from "./marque.js"
import Equipe from "./equipe.js"

class Tableau extends React.Component {
  constructor(props) {
    super(props)
    /*this.state = {"id":1,"hote":{"nom":"NEC","marque":21},"visiteur":{"nom":"USJA","marque":19}}*/
    this.state = this.props.rencontre
    console.info("Taleau de la rencontre " + JSON.stringify(this.props.rencontre))
    this.surPanierHote = () => {
      var marque = this.state.hote.marque
      console.info("marque avant: " + JSON.stringify(marque))
      this.state.hote.marque=marque+1
      this.setState(this.state)
      console.info("marque apres: " + JSON.stringify(this.state.hote.marque))
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
