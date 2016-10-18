var MongoClient = require('mongodb').MongoClient;
console.log("Lancement de l'utilitaire de migration.")
console.log("url de la base de donnée source: " + urlHeroku)
var urlLocale = "mongodb://@localhost:27017/baskoredb"
console.log("url de la base de donnée locale: " + urlLocale)

MongoClient.connect(urlHeroku, function (err, dbH) {
  MongoClient.connect(urlLocale, function (err, dbL) {
    dbH.collection("rencontres")
      .find()
      .each((err, rencontre) => {
        if (rencontre != null) {
          console.log("rencontre: " + JSON.stringify(rencontre))
          dbL.collection("rencontres").insert(rencontre)
        }
      })
    dbL.close();
  })
  dbH.close();
})
