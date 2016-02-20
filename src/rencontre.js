import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import Avatar from 'material-ui/lib/avatar'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'
var request = require('request')

var Rencontre = React.createClass({
  rencontreSelectionnee: function() {
    console.info("Rencontre selectionnee: " + JSON.stringify(this.props.rencontre));
    this.props.surSelectionRencontre(this.props.rencontre)
  },
  render() {
    var rencontre = this.props.rencontre
    var versus = rencontre.id + " / " + rencontre.hote.nom + " - " + rencontre.visiteur.nom
    return (
        <ListItem leftAvatar={<Avatar icon={<FileFolder/>}/>} primaryText={versus} secondaryText="18 janvier 2016" rightIcon={<ActionInfo/>} onClick={this.rencontreSelectionnee}/>
    )
  }
})

export default Rencontre
