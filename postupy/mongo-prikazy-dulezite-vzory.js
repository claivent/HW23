//Příklad na find 1

db.getCollection("customers").find({});

db.customers.find({"device": "Apple iPhone"});

db.customers.find(
  {
    "address.state": {$in: ["Washington", "Oregon"]},
    "device": /.*iphone.*/i
  },
  {
    first: 1, last: 1, user_name: 1
  }
);

//Příklad na find 2

db.getCollection("customers").find(
  {
    "address.state" : {
      "$in" : [
        "Washington",
        "Idaho"
      ]
    },
    "device": /.*iphone.*/i,
    "user_name": {$exists: true} // Uživatel musí existovat  "user_name" : 1.0
  },
  {
    "first" : 1.0,
    "last" : 1.0,
    "user_name" : 1.0, //$exist využívaá tohle pole
    "_id": 0 //1 u first last a user_name znamená,že se projektujou na výstup. Pokud je 0 pak se seřadí, ale neprojektují se. Musím si vybrat zdali chci u všech 0 nebo 1. Nesmím kombinovat. Vzjímkou je pouze _id to může mít hodnotu nezávisle na ostatních projektovaných attributech
  }
).sort(
  {
    "last" : 1.0,
    "first" : 1.0
  }
);

//Příklad na aggregate 1
//db.getCollection(collection).aggregate(pipeline [, options])

//use sales;
db.getCollection("customers").aggregate(
  [ //pipeline je vždy uavřena do square bracket. Zde je pouze jedna pipeline
    //pipeline defines three stages, each enclosed in curly braces.
    { "$match": { "prio_support": true } }, //Stage 1 uses the $match operator to filter the documents in the pipeline.
    { "$group": //Stage 2 uses the $group operator to group the documents by the package field.
        { "_id": "$package", "totals": { "$sum": "$transactions" } } },
        //A value of 1 indicates that the documents should be sorted in ascending order, and a value of -1 indicates that they should be sorted in descending order.
    { "$sort": { "_id": 1 } } //Stage 3 uses the $sort operator to sort the documents in the pipeline.
  ], //However, you can also add an options argument, which includes one or more options that control statement execution.
  {
    "allowDiskUse": true , //The first option sets the allowDiskUse setting to true, which enables the aggregation operations to write data to temporary files on disk.
    "collation":  //The second option sets the collation settings, which can take multiple values.
      { "locale" : "en_US", "strength": 1 }
  }
);

//Příklad na aggregate 1  $match

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "address.state" : "California"
      }
    }
  ],
  {
    "allowDiskUse" : false
  }
);
//Příklad na aggregate 2  $match + $group
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "address.state" : "California"
      }
    },
    {
      "$group" : {
        "_id" : "$address.city",
        "total" : {
          "$sum" : "$transactions"
        }
      }
    }
  ],
  {
    "allowDiskUse" : false
  }
);

//Příklad na aggregate 3  $match + $group

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "address.state" : "California"
      }
    },
    {
      "$group" : {
        "_id" : "$address.city",
        "total" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$project" : {
        "_id" : NumberInt(0), //0  - projekce je bez _id
        "city" : "$_id", // Krásně přejmenujeme id na city
        "total" : NumberInt(1) // hodnota jedna poukazuje na to, že projekce pole total bude
      }
    }
  ],
  {
    "allowDiskUse" : false // stejné jako předchozí připad nezapisujje do temp folder.
  }
);

//Příklad na aggregate 4  $replaceRoot
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "address.state" : "California"
      }
    },
    {
      "$group" : {
        "_id" : "$address.city",
        "total" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$project" : {
        "_id" : NumberInt(0),
        "city" : "$_id",
        "total" : NumberInt(1)
      }
    },
    {
      "$replaceRoot" : {
        "newRoot" : {
          "city" : "$city",// Všimněte si, že $city se načte do city to samé se stane s $total
          "total" : "$total"
        }
      }
    }
  ],
  {
    "allowDiskUse" : false // stejné jako předchozí příklad
  }
);

//Příklad na aggregate 4  $sort

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "address.state" : "California"
      }
    },
    {
      "$group" : {
        "_id" : "$address.city",
        "total" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$project" : {
        "_id" : NumberInt(0),
        "city" : "$_id",
        "total" : NumberInt(1)
      }
    },
    {
      "$replaceRoot" : {
        "newRoot" : {
          "city" : "$city",
          "total" : "$total"
        }
      }
    },
    {
      "$sort" : { // Za zmínku zde stojí jenom hodnota -1, která vyjadřuje descending. 1 ascending
        "total" : NumberInt(-1)
      }
    }
  ],
  {
    "allowDiskUse" : false
  }
);









