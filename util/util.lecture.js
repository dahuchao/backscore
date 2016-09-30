var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire: ")
//var urlParDefaut = "mongodb://admin:pass@localhost:27017/test"
var urlParDefaut = "mongodb://organisateur:orga123@ds055905.mongolab.com:55905/heroku_5cn196b4"

//PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGOLAB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function (err, db) {
  db.collection("rencontres")
    .find({
      // id: 0
      // "hote.nom": "test hote"
    })
    .forEach((rencontre) => {
      console.log("rencontre: " + JSON.stringify(rencontre))
    })
  console.log("Taille de la base de donnée: " + db.collection("rencontres").find().count())


  db.collection("rencontres")
    .find()
    .map(rencontre => rencontre.id)
    .toArray(function (err, ids) {
      let idCalcule = ids.reduce((max, id) => {
        console.log("rencontre id/max: " + id + "/" + max);
        return id > max ? id : max
      }, 0)
      // Calcul de l'identifiant de la nouvelle rencontre
      idCalcule++
      console.log("Nouvel id: " + idCalcule);
    })

  db.close();
})
