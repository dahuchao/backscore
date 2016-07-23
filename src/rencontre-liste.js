import React from 'react'
import ReactDOM from 'react-dom'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import Rencontre from "./rencontre.js"

var RencontreListe = React.createClass({
  getInitialState: function() {
    console.info("Initiales props: " + this.props.rencontres)
    return {rencontres: this.props.rencontres}
  },
  componentDidMount: function() {
    console.info("Mise à jour props: " + this.props.rencontres)
  },
  render() {
    if (!this.state.Rencontres) return null
    var liRencontres = this.state.rencontres.map(rencontre => {
      return (<Rencontre rencontre={rencontre} surSelectionRencontre={this.rencontreSelectionnee}/>);
    })
    return (
      <Card>
        <CardText>
          <List>
            {liRencontres}
          </List>
        </CardText>
      </Card>
    )
  }
})
export default RencontreListe
