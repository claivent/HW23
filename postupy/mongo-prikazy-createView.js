//Příkaz pro vytvoření view
/*
* db.createView(<name>, <collection>, <pipeline>[, collation: <options> ])
* Replace the <name> placeholder with the name you want to assign to the view.
Replace the <collection> placeholder with the name of the target collection.
Replace the <pipeline> placeholder with an aggregation pipeline, which is an array made up of one or more stages.
The pipeline is similar to what’s used for the aggregate method, except with a few minor differences. For example, the createView pipeline does not support the $out or $merge operator.
The collation argument is optional. If you include it, replace the <options> placeholder with a document containing the language-specific rules you want applied to string comparisons.
*
*
* db.getCollection(collection).aggregate(pipeline, options)
* pipeline ::= [stage, ...]
* stage ::= { aggregate_method: expression }
* option ::= {option, ...}
* option ::= option_name: option_value
*
* */


db.createView(
  "get_totals",
  "customers",
  [
    {
      "$match" : {
        "transactions" : {
          "$gt" : NumberLong(0) } }
    },
    {
      "$group" : {
        "_id" : {
          "package" : "$package" },
        "SUM(transactions)" : { "$sum" : "$transactions" } }
    },
    {
      "$project" : {
        "package" : "$_id.package",
        "total" : "$SUM(transactions)",
        "_id" : NumberInt(0) }
    }
  ]
);

use sales;
db.getCollection("customers").aggregate(
  [
    { "$match": { "address.state": "Washington" } },
    { "$group":
        { "_id": "$address.city", "totals": { "$sum": "$transactions" } } },
    { "$sort": { "_id": 1.0 } }
  ],
  {
    "allowDiskUse": true,
    "collation": { "locale" : "en_US" }
  }
);

//Filtering the documents in the aggregation pipeline
db.customers.aggregate(
  [
    { "$match": { "dob": { "$lt": ISODate("1970-01-01T00:00:00.000Z") } } }
  ]
);

//Grouping the documents in the aggregation pipeline

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "dob" : {
          "$lt" : ISODate("1970-01-01T00:00:00.000+0000")
        }
      }
    },
    {
      "$group" : {
        "_id" : "$address.state",
        "total" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$sort" : {
        "total" : NumberInt(-1)
      }
    }
  ],
  {
    "allowDiskUse" : true,
    "collation" : {
      "locale" : "en_US"
    }
  }
);






