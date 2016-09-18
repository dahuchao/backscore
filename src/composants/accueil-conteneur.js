import React from "react"

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
