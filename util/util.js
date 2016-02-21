var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire: ")
var urlParDefaut = "mongodb://admin:pass@localhost:27017/test"
  //PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGOLAB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.collection("rencontres").insertMany(rencontres, function(err, result) {
    assert.equal(err, null);
    console.log("Rencontres chargées.");
    db.close();
  })
  // rencontres.forEach((rencontre) => {
  //   db.collection("rencontres").insert(rencontre)
  //   console.log("Insertion rencontre: " + rencontre.id)
  // })
})
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
}]
