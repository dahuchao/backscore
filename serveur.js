// Chargement du module expressjs
var express = require('express')
var cors = require('express-cors')
var Immutable = require('immutable')
var MongoClient = require('mongodb').MongoClient;
// Codec base 64
//var base64 = require('base-64')
// Création de l'application express
var app = express();
app.use(cors({
  allowedOrigins: [
    'localhost:3000'
  ]
}))
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80));
// Répertoire des pages du site web
var repertoireSite = "./public";
console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite);
// Répertoire racine
app.use('/', express.static(repertoireSite));
//**********************************************
// Connection à la base de données
//var urlParDefaut = "mongodb://dahu:dahu@localhost:27017/test"
var urlParDefaut = "mongodb://organisateur:orga123@ds055905.mongolab.com:55905/heroku_5cn196b4"
//PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGOLAB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)
//**********************************************
// Traitement de la requête GET http://localhost/rencontres
app.get("/api/rencontres", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible: " + err)
      console.log("Utilisation liste statique de test.")
      res.jsonp(rencontres);
    } else {
      db.collection("rencontres").find().toArray(function (err, rencontres) {
        if (err) {
          console.log("Les données rencontres indisponible: " + err)
        } else {
          // Lecture de la liste des rencontres
          console.log("Nombre de rencontre en base", rencontres.length)
          res.jsonp(rencontres);
          //db.close()
        }
      })
    }
  })
})
app.get('/api/rencontres/:id', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible.")
    } else {
      db.collection("rencontres").find().toArray(function (err, rencontres) {
        if (err) {
          console.log("Les rencontres.")
        } else {
          // Calcul du nom de la page recherchée
          var idRencontre = req.params.id;
          console.log('Ouverture de la recontre:' + idRencontre)
          rencontres.filter(function (rencontre) {
            return rencontre.id == idRencontre
          }).forEach(function (rencontre) {
            // Lecture de la rencontre
            res.jsonp(rencontre);
            console.log('Envoie de la rencontre ! ' + JSON.stringify(rencontre));
          })
          //db.close()
        }
      })
    }
  })
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
var serveur = app.listen(app.get('port'), function () {
  console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port);
})
// Chargement de socket.io
var io = require('socket.io').listen(serveur);
// Socket des abonnés au flux de publication des mesures de la sonde de température
var socketAbonnes = Immutable.Map();
// Quand on client se connecte, on le note dans la console
io.sockets.on('connect', function (socket) {
  socket.emit('message', 'Vous êtes bien connecté au comité !');
  // Quand la table de marque recoit une demande d'abonnement à un tableau de marque
  socket.on('ouvrirRencontre', function (idRencontre) {
    console.log('Abonnement à la recontre:' + idRencontre)
    rencontres.filter(function (rencontre) {
      return rencontre.id == idRencontre
    }).forEach(function (rencontre) {
      socketAbonnes = socketAbonnes.set(socket, idRencontre);
      console.log("Nouvel abonnement rencontre: " + rencontre.id);
      console.log("Nombres abonnés: " + socketAbonnes.count());
    })
  });
  // Un panier est marqué
  socket.on('panierMarque', function (rencontre) {
    console.log("Panier marqué !");
    console.log("Nouvelle marque:" + JSON.stringify(rencontre));
    socketAbonnes.filter(function (idRencontre) {
      return idRencontre == rencontre.id
    }).forEach(function (idRencontre, soc) {
      console.log("id: " + JSON.stringify(idRencontre));
      soc.emit("nouvelleMarque", rencontre);
      console.log("Envoie de la nouvelle marque ! " + JSON.stringify(rencontre));
    })
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log("Base de données indisponible.")
      } else {
        console.log("Enregistrement de la nouvelle marque.")
        db.collection("rencontres").update({
          id: rencontre.id
        }, {
            $set: {
              "hote.marque": rencontre.hote.marque,
              "visiteur.marque": rencontre.visiteur.marque
            }
          })
      }
    })
  })
})
