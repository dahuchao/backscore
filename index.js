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
        Site de publication
      </header>
    	<section>
        <Tableau />
      </section>
      <footer>pied de page</footer>
      </div>)
  }
  handleClick () {
    this.setState({ n: this.state.n + 1 })
  }
}
React.render(<App />, document.querySelector('#content'))
