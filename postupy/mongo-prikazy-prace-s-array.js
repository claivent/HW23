//use sales;
db.customers.find(
  { "interests": "Gaming" } );

//use sales;
db.customers.find(
  { "interests": { $elemMatch: {$eq: "Gaming"} } } );

db.customers.find(//V tomto případě interest attribut musí obsahovat obě hodnoty tj. gaming a web desingn
  { "interests": ["Gaming", "Web Design"] } );

db.customers.find(
  {
    "$and": [ //to samé jako v předchozím příkladu.
      { "interests": "Gaming" },
      { "interests": "Web Design" } ]
  } );

db.customers.find(
  {
    "$or": [ //operátor $or nám říká, že array musí obsahovat alespoň jednu hodnotu.
      { "interests": "Gaming" },
      { "interests": "Web Design" } ]
  } );

db.customers.find( // V tomto příkazu je přidaná projekce polí last a interests. Hodnota jedna zviditelní atributy.
  // Uvidíme společně s těmito attributy i _id attribut.
  { "interests": { $elemMatch: {$eq: "Database"} } },
  { "last" : 1.0, "interests": 1.0 } );

db.customers.find(
  { "interests": { $elemMatch: {$eq: "Database"} } },
  { "last" : 1.0, "interests": 1.0 } );

db.customers.find(
  { interests: "Database" }, //V předchozím případu byl použit operáror $elemMatch. Nebyl zapotřebí, protože zde je pouze jediná podmínka. Lze tedy použít tuto zkrácenou definici příkazu v případě pouze jediné podmínky.
  { "last" : 1.0, "interests": 1.0 } );

db.customers.find(
  { "interests.0": "Web Design" }, //Indexy MongoDB jsou založeny na nule, takže interests.0odkazují na první pozici v interestspoli. Výsledkem je, že příkaz vrátí pouze dokumenty, jejichž první hodnota v tomto poli je Web Design
  { "last" : 1.0, "interests": 1.0 } );

db.customers.find( //Příkaz používá $sizeoperátor k určení, že interestspole by mělo obsahovat přesně čtyři prvky pro dokument, který má být vrácen.
  { interests: { $size: 4 } },
  { "last" : 1.0, "interests": 1.0 } );

db.customers.find(
  {
    "$and": [
      { "interests": { $elemMatch: { $eq: "Database" } } },
      { "interests": { $elemMatch: { $eq: "Web Design" } } } ]
  },
  { "last" : 1.0, "interests" : 1.0 } );

db.customers.find(
  {
    "$and": [
      { "interests": "Database" },
      { "interests": "Web Design" } ]
  },
  { "last" : 1.0, "interests" : 1.0 } );

db.customers.find(  //Namísto použití $andoperátoru používá příkaz $alloperátor, který poskytuje jednoduchý způsob, jak určit, že vrácené dokumenty by měly obsahovat určité hodnoty v cílovém poli.
  { "interests": { $all: ["Database", "Web Design"] } },
  { "last" : 1.0, "interests" : 1.0 } );

db.getCollection("customers").find(
  {
    "$and" : [
      {
        "interests" : {
          "$elemMatch" : {
            "$eq" : "Database"
          }
        }
      },
      {
        "interests" : {
          "$elemMatch" : {
            "$eq" : "Web Design"
          }
        }
      }
    ]
  },
  {
    "last" : 1.0,
    "interests" : 1.0
  }
);

