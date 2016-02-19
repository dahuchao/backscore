// Chargement du module expressjs
var express = require('express')
var MongoClient = require('mongodb').MongoClient;
// Codec base 64
//var base64 = require('base-64')
// Création de l'application express
var app = express();
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80));
// Répertoire des pages du site web
var repertoireSite = 'public';
console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite);
// Répertoire racine
app.use('/', express.static(repertoireSite));
//**********************************************
// Connection à la base de données
var urlParDefaut = "mongodb://admin:pass@localhost:27017/test"
  //PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGOLAB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)
  //**********************************************
  // Traitement de la requête GET http://localhost/rencontres
app.get('/api/rencontres', function(req, res) {
    // MongoClient.connect(url, function(err, db) {
    //     assert.equal(null, err);
    //     db.collection("rencontres").find().toArray(function(err, docs) {
    //       test.equal(null, err);
    //       console.log("Nombre de rencontre en base", docs.length);
    //       db.close();
    //     });
    //   })
      // Lecture de la liste des rencontres
    res.jsonp(rencontres);
    console.log('*** Rencontres ***', rencontres);
  })
  // Traitement de la requête GET http://localhost/rencontres/:id
app.get('/api/rencontres/:id', function(req, res) {
    // Calcul du nom de la page recherchée
    var idRencontre = req.params.id;
    // Lecture de la rencontre
    res.jsonp(rencontres[idRencontre]);
    console.log('*** Rencontre : %s ***', idRencontre);
    //**********************************************
  })
  // Serveur de publication mesures de la sonde de température
var rencontres = [{
  id: 1,
  hote: {
    nom: "NEC",
    marque: 11
  },
  visiteur: {
    nom: "USJA",
    marque: 11
  }
}, {
  id: 2,
  hote: {
    nom: "NEC",
    marque: 22
  },
  visiteur: {
    nom: "Montaigu",
    marque: 22
  }
}, {
  id: 3,
  hote: {
    nom: "NEC",
    marque: 33
  },
  visiteur: {
    nom: "Coulaine",
    marque: 33
  }
}];
//**********************************************
// Démarrage du serveur
var serveur = app.listen(app.get('port'), function() {
    console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port);
  })
  // Chargement de socket.io
var io = require('socket.io').listen(serveur);
// Socket des abonnés au flux de publication des mesures de la sonde de température
var socketAbonnes = new Array();
// Quand on client se connecte, on le note dans la console
io.sockets.on('connect', function(socket) {
  socket.emit('message', 'Vous êtes bien connecté au comité !');
  socketAbonnes.push(socket);
  console.log('Nouvelle connexion !' + socketAbonnes.length);
  // Quand la table de marque recoit un abonnement d'un tableau de marque
  socket.on('ouvrirRencontre', function(idRencontre) {
    console.log('Abonnement à la recontre:' + idRencontre)
    rencontres.filter(function(rencontre) {
      return rencontre.id == idRencontre
    }).forEach(function(rencontre) {
      socket.emit('fournitureRencontre', rencontre);
      console.log('Envoie de la rencontre ! ' + JSON.stringify(rencontre));
    })
  });
  // Un panier est marqué
  socket.on('panierMarque', function(marque) {
    console.log('Nouvelle marque:' + marque);
    console.log('Nombre de tableau de marque:' + socketAbonnes.length);
    socketAbonnes.forEach(function(soc) {
      soc.emit('nouvelleMarque', marque);
      console.log('Envoie de la nouvelle marque ! ' + JSON.stringify(marque));
    })
  });
})
