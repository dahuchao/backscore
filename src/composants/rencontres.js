import React from "react"
import { Link, browserHistory } from "react-router"
import {
  AppBar,
  Card,
  CardText,
  List,
  ListItem,
  RaisedButton,
  Avatar,
  FloatingActionButton,
  TextField,
  DatePicker
} from "material-ui"
import ActionInfo from "material-ui/svg-icons/action/info"
import FileFolder from "material-ui/svg-icons/file/folder"
import ContentAdd from "material-ui/svg-icons/content/add"
// import moment from "moment/src/moment"

const Rencontres = React.createClass({
  onOuverture(id) {
    console.debug("onOuverture: " + id)
    this.transitionTo("/#/rencontres/" + id)
  },
  preparationDate(date) {
    let dateRencontre = new Date(date)
    console.info("date Rencontres: " + JSON.stringify(dateRencontre))
    // let date = moment().format("DD MM YYYY")
    // let date = "2016-10-05"
    let jour = new Date()
    console.info("date jour: " + JSON.stringify(jour))
    console.info("rencontredate < date: " + (dateRencontre < jour))
    let strdate
    !dateRencontre ?
      strdate = "date à préciser" :
      dateRencontre < jour ?
        strdate = jour.getDay() + "-" + jour.getMonth() + "-" + jour.getFullYear() :
        strdate = jour.getDay() + "-" + jour.getMonth()
    return strdate
  },
  render() {
    const style = {
      marginRight: 20
    }
    const styleRencontre = {
      textDecoration: 'none'
    }
    return (
      <div>
        <AppBar title="BACKSCORE"
          onClick={this.props.listerRencontres}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <FloatingActionButton style={style}
              onMouseDown={this.props.ajouterRencontre}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <CardText>
            <List id="rencontres" >
              {this.props.rencontres.map(rencontre => {
                let strdate = this.preparationDate(rencontre.date)
                return (
                  <ListItem
                    key={rencontre.id}
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText={strdate}
                    containerElement={<Link to={"/rencontres/" + rencontre.id}/>}
                    rightIcon={<ActionInfo />}
                    rightIconButton={
                      <RaisedButton onClick={this.props.supprimeRencontre.bind(null, rencontre.id)}
                        label="Supprimer" primary={true} />
                    }
                    //onClick={this.onOuverture.bind(this, rencontre.id)}
                    />
                )
              })}
            </List>
          </CardText>
        </Card>
      </div>
    )
  }
})
export default Rencontres;
