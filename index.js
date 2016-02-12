import React from 'react'
import ReactDOM from 'react-dom';
import Rencontres from "./src/rencontres.js"
import AppBar from 'material-ui/lib/app-bar';

var App = React.createClass({
  render () {
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <header>
          <div className="info">
            <div className="organisateur">
              Ligue régionale de basket des Pays de la Loire, Saison régulière
            </div>
            <div className="date" itemprop="datePublished" content="(none)">
              Dim. 10 janvier 2016
            </div>
          </div>
        </header>
      	<section>
          <Rencontres />
        </section>
        <footer>
          <div className="info">
            <div className="organisateur">
              Ligue régionale de basket des Pays de la Loire, Saison régulière
            </div>
            <div className="date" itemprop="datePublished" content="(none)">
              Dim. 10 janvier 2016
            </div>
          </div>
        </footer>
      </div>
    )
  }
})
ReactDOM.render(<App />, document.querySelector('#content'))
