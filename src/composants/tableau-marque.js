import React from "react"

export default React.createClass({
  render() {
    return (
      <div id="marque">
        <div id="periode">
          <span className="periode">T1</span>
          <span className="periode">T2</span>
          <span className="periode">T3</span>
          <span className="periode">T4</span>
        </div>
        <div className="compteur">
          <span className="hote"
            onClick={this.props.surCorrectionHote}>{this.props.hote}</span>-
          <span className="visiteur"
            onClick={this.props.surCorrectionVisiteur}>{this.props.visiteur}</span>
        </div>
      </div>
    )
  }
})

