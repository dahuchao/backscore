import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import AccueilConteneur from "./composants/accueil-conteneur.js"
import RencontresConteneur from "./composants/rencontres-conteneur.js"
import RencontreConteneur from "./composants/rencontre-conteneur.js"

export default (
  <Router history={hashHistory} >
    <Route path="/" component={AccueilConteneur} >
      <Route path="rencontres" component={RencontresConteneur} />
      <Route path="rencontres/:idRencontre" component={RencontreConteneur} />
    </Route>
  </Router>
)
