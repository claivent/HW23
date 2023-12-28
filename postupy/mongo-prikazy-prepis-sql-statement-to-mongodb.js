/*select first, last, transactions
from customers
where transactions > 65
order by transactions desc, last asc;*/

db = db.getSiblingDB("sales");
db.getCollection("customers").find(
  {
    "transactions" : {
      "$gt" : NumberLong(65)
    }
  },
  {
    "first" : "$first",
    "last" : "$last",
    "transactions" : "$transactions",
    "_id" : NumberInt(0)
  }
).sort(
  {
    "transactions" : NumberInt(-1),
    "last" : NumberInt(1)
  }
);


//
/*select first, last, interests
from customers
where dob < IsoDate('1990-01-01T00:00:00.000+0000')
and interests like '%database%'
order by last, first;*/

db = db.getSiblingDB("sales");
db.getCollection("customers").find(
  {
    "dob" : {
      "$lt" : ISODate("1990-01-01T00:00:00.000+0000")
    },
    "interests" : /^.*database.*$/i
  },
  {
    "first" : "$first",
    "last" : "$last",
    "interests" : "$interests",
    "_id" : NumberInt(0)
  }
).sort(
  {
    "last" : NumberInt(1),
    "first" : NumberInt(1)
  }
);


//
/*select first, last, interests
from customers
where dob < IsoDate('1990-01-01T00:00:00.000+0000')
and (interests like '%database%'
       or interests like '%gaming%')
order by last, first;*/

db = db.getSiblingDB("sales");
db.getCollection("customers").find(
  {
    "dob" : {
      "$lt" : ISODate("1990-01-01T00:00:00.000+0000")
    },
    "$or" : [
      {
        "interests" : /^.*database.*$/i
      },
      {
        "interests" : /^.*gaming.*$/i
      }
    ]
  },
  {
    "first" : "$first",
    "last" : "$last",
    "interests" : "$interests",
    "_id" : NumberInt(0)
  }
).sort(
  {
    "last" : NumberInt(1),
    "first" : NumberInt(1)
  }
);

//
/*SELECT address.state, sum(transactions)
from customers
where prio_support = false
group by address.state
order by sum(transactions) desc*/

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "prio_support" : false
      }
    },
    {
      "$group" : {
        "_id" : {
          "address᎐state" : "$address.state"
        },
        "SUM(transactions)" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$project" : {
        "address.state" : "$_id.address᎐state",
        "SUM(transactions)" : "$SUM(transactions)",
        "_id" : NumberInt(0)
      }
    },
    {
      "$sort" : {
        "SUM(transactions)" : NumberInt(-1)
      }
    }
  ],
  {
    "allowDiskUse" : true
  }
);


// protože sql editor neumí převádět něco as total musíme to dodělat ručně v aggregation editoru

db = db.getSiblingDB("sales");
db.getCollection("customers").aggregate(
  [
    {
      "$match" : {
        "prio_support" : false
      }
    },
    {
      "$group" : {
        "_id" : {
          "address᎐state" : "$address.state"
        },
        "SUM(transactions)" : {
          "$sum" : "$transactions"
        }
      }
    },
    {
      "$project" : {
        "address.state" : "$_id.address᎐state",
        "total" : "$SUM(transactions)",
        "_id" : NumberInt(0)
      }
    },
    {
      "$sort" : {
        "total" : NumberInt(-1)
      }
    }
  ],
  {
    "allowDiskUse" : true
  }
);

