// Chargement du module expressjs
var express = require('express');
// Codec base 64
var base64 = require('base-64')
  // Création de l'application express
var app = express();
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80));
// Répertoire des pages du site web
var repertoireSite = 'public';
console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite);
if (!fs.existsSync(repertoireSite)) {
  console.error('Répertoire des pages indisponible');
}
// Répertoire racine
app.use('/', express.static(repertoireSite));
//**********************************************
// Traitement de la requête GET http://localhost/documents/nom-doc.pdf
app.get('/rencontres/:id', function(req, res) {
  // Calcul du nom de la page recherchée
  var idRencontre = req.params.id;
  console.log('*** Rencontre : %s ***', idRencontre);
});
//**********************************************
// Démarrage du serveur
var serveur = app.listen(app.get('port'), function() {
  console.log('Ecoute sur le port %d', serveur.address().port);
});
//**********************************************
// Serveur de publication mesures de la sonde de température
var rencontres = [{
  id: 12,
  hote: {
    nom: "CTC NEC",
    marque: 92
  },
  visiteur: {
    nom: "UFAB Angers",
    marque: 78
  }
}, {
  id: 17,
  hote: {
    nom: "CTC NEC",
    marque: 56
  },
  visiteur: {
    nom: "Montaigu",
    marque: 26
  }
}];
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
});
