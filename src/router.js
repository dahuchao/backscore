import React from 'react';
import { Router, IndexRedirect, Route, hashHistory } from 'react-router';
import AccueilConteneur from "./composants/accueil-conteneur.js"
import RencontresConteneur from "./composants/rencontres-conteneur.js"
import RencontreConteneur from "./composants/rencontre-conteneur.js"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default (
  <MuiThemeProvider>
    <Router history={hashHistory} >
      <Route path="/" component={AccueilConteneur} >
        <IndexRedirect to="/rencontres" />
        <Route path="/rencontres/:idRencontre" component={RencontreConteneur} />
        <Route path="/rencontres" component={RencontresConteneur}/>
      </Route>
    </Router>
  </MuiThemeProvider>
)
