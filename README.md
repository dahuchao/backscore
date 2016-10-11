# backscore
Publication des tableaux de marque de rencontre de basket.

Les utilisateurs spectateurs d'une rencontre, peuvent noter l'évolution du résultat sur cette table de marque
électronique. Les utilisateurs distants qui n'ont pas pu se déplacer, voient depuis leur canapé l'évolution
du résultat en temps réel (sans avoir à raffraichir le tableau).

Attention Projet en cours de développement : stabilité non garantie.

Mode SASS : https://backscore.herokuapp.com

## Installation

```
npm Install
```

## Lancement de l'application

```
npm start
```
ouvrir l'application à l'adresse http://localhost

## Utilisation

Lorsqu'un arbitre note la marque, elle est automatiquement notifiée à tous les tableaux de marque que sont les terminaux de la rencontre.

## Architecture

Cette application est un pretexte (POC) pour la mise en oeuvre des technologies suivantes : 
* REACT
* REDUX (FLUX)
* Material-design (RWD)
* Expressjs (API REST)
* Socket.io (WebSocket)
* Mongodb (NOSQL)
