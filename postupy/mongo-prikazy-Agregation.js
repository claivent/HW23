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
      "$project" : {
        "_id" : NumberInt(0),
        "state" : "$_id",
        "total" : NumberInt(1)
      }
    },
    {
      "$replaceRoot" : {
        "newRoot" : {
          "state" : "$state",
          "total" : "$total"
        }
      }
    },
    {
      "$sort" : {
        "state" : NumberInt(1)
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
