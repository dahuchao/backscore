import React from "react"
import { Link } from 'react-router'
import {AppBar} from "material-ui"
import {IconButton} from "material-ui"
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import Tableau from "./tableau-vue"

const Rencontre = React.createClass({
  render: function () {
    return (
      <div>
        <AppBar title="Rencontre"
          iconElementLeft={
            <IconButton containerElement={<Link to="/rencontres"/>}>
              <NavigationArrowBack/>
              {/*
              <Link to="/rencontres">
                <NavigationArrowBack/>
              </Link>
            */}
            </IconButton>}>
        </AppBar>
        <Tableau rencontre={this.props.rencontre}/>
      </div>
    )
  }
})

export default Rencontre
