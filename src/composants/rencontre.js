import React from 'react'
import Tableau from "./tableau-vue.js"
import AppBar from 'material-ui/lib/app-bar'
import {IconButton} from "material-ui"
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back"
import { Link } from 'react-router'

const Rencontre = React.createClass({
  render: function () {
    return (
      <div>
        <AppBar title="Rencontre"
          iconElementLeft={
            <IconButton href="#/rencontres">
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
