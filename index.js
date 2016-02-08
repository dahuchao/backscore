import React from 'react'
import Tableau from "./src/tableau.js"
class App extends React.Component {
  constructor () {
    super()
    this.state = { n: 0 }
  }
  render () {
    return  	(<div>
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
        <Tableau />
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
      </div>)
  }
  handleClick () {
    this.setState({ n: this.state.n + 1 })
  }
}
React.render(<App />, document.querySelector('#content'))
