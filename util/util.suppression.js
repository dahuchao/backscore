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
  db.collection("rencontres").remove({
    id: 0
    // "hote.nom": "test hote" 
  })
  let rencontres = db.collection("rencontres").find()
  rencontres.forEach((rencontre) => {
    console.log("rencontre: " + JSON.stringify(rencontre))
  })
  db.close()
})
