import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import List from 'material-ui/lib/lists/list'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

export default function (props) {
  return (
    <div>
      {props.children}
      <footer>
        <div className="info">
          <div className="organisateur">
            Ligue régionale de basket des Pays de la Loire, Saison régulière
          </div>
          <div className="date">
            Dim.10 janvier 2016
          </div>
        </div>
      </footer>
    </div>
  )
}
