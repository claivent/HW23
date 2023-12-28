/*$lookup:
{
  from: secondary_collection,
  localField: primary_collection_field,
  foreignField: secondary_collection_field,
  as: new_array_field_name
}*/

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
        "transactions" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$lookup" : {
        "from" : "population",
        "localField" : "_id",
        "foreignField" : "state",
        "as" : "state_info"
      }
    },
    {
      "$replaceRoot" : {
        "newRoot" : {
          "state" : "$_id",
          "transactions" : "$transactions",
          "population" : "$state_info.population"
        }
      }
    },
    {
      "$sort" : {
        "state" : 1.0
      }
    }
  ],
  {
    "allowDiskUse" : false,
    "collation" : {
      "locale" : "en_US"
    }
  }
);

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
        "transactions" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$lookup" : {
        "from" : "population",
        "localField" : "_id",
        "foreignField" : "state",
        "as" : "state_info"
      }
    },
    {
      "$replaceRoot" : {
        "newRoot" : {
          "state" : "$_id",
          "transactions" : "$transactions",
          "population" : "$state_info.population"
        }
      }
    },
    {
      "$set" : {
        "population" : {
          "$toInt" : {
            "$replaceAll" : {
              "input" : {
                "$first" : "$population"
              },
              "find" : ",",
              "replacement" : ""
            }
          }
        }
      }
    },
    {
      "$set" : {
        "ratio" : {
          "$round" : [
            {
              "$divide" : [
                "$transactions",
                "$population"
              ]
            },
            NumberInt(7)
          ]
        }
      }
    },
    {
      "$sort" : {
        "ratio" : NumberInt(-1)
      }
    },
    {
      "$limit" : NumberInt(5)
    }
  ],
  {
    "allowDiskUse" : false,
    "collation" : {
      "locale" : "en_US"
    }
  }
);



