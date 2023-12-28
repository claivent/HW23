db.warehouses.insertMany( [
  {
    _id: 1,
    warehouse : "warehouse1",
    inventory : [
      { product: "widgetA", in_stock: 24 },
      { product: "widgetB", in_stock: 137 },
      { product: "widgetC", in_stock: 99 } ]
  },
  {
    _id: 2,
    warehouse : "warehouse2",
    inventory : [
      { product: "widgetA", in_stock: 99 },
      { product: "widgetC", in_stock: 12 },
      { product: "widgetG", in_stock: 122 } ]
  },
  {
    _id: 3,
    warehouse : "warehouse3",
    inventory : [
      { product: "widgetC", in_stock: 89 },
      { product: "widgetD", in_stock: 99 },
      { product: "widgetF", in_stock: 43 } ]
  } ] );

db.warehouses.find({
  "inventory.product": "widgetC",  // vrátí všechny tři dokumenty i když má vrátit pouze jeden. U embeded dokumentů musí zápis vypadat jinak.
  "inventory.in_stock": { $gte: 90 } } );

db.warehouses.find({  // Opět errorr. Tentokrát příkaz nevrací žádné dokumenty, protože vyhledávač hledá přesnou shodu, což operátor $gteporovnání není možné.
  inventory: { product: "widgetC", in_stock: { $gte: 90 } } } );

db.warehouses.find(
  { inventory: { $elemMatch: // Takhle je to správně. widgetCV tomto případě bude vrácen pouze první doklad, protože představuje jediný sklad, který má k dispozici alespoň 90 produktů.
        { product: "widgetC", in_stock: { $gte: 90 } } } } );


db = db.getSiblingDB("sales"); //Opět nemusím použít $elemMatch pokud máme jen jednu vyhledávací podmínku.
db.getCollection("customers2").find(
  {
    "travel.visits" : {
      "$gt" : NumberInt(3)
    }
  }
);


db.customers.insertMany( [
  {
    _id: 1,
    first : "Maria",
    travel : [
      { country: "Canada", visits: 3, rating: 7 },
      { country: "Poland", visits: 1, rating: 8 },
      { country: "Thailand", visits: 2, rating: 9 } ]
  },
  {
    _id: 2,
    first : "Chen",
    travel : [
      { country: "Thailand", visits: 3, rating: 7 },
      { country: "Canada", visits: 2, rating: 9 },
      { country: "Costa Rica", visits: 4, rating: 8 } ]
  },
  {
    _id: 3,
    first : "Gladys",
    travel : [
      { country: "Canada", visits: 1, rating: 8 },
      { country: "Thailand", visits: 2, rating: 9 },
      { country: "Australia", visits: 3, rating: 10 } ]
  } ] );


db.customers.find( // stejně jako předchozí příklad.
  { travel: { $elemMatch: { visits: { $gt: 3 } } } } );


db.customers.find({ //Je to špatně. V tomto příkladu musíme použít $elemMatch, protože jsou zde dvě podmínky a opět by to bylo vyhodnocené špatně
  "travel.visits": { $gt: 2 }, "travel.rating": { $gt: 8 } } );

db.customers.find(
  { travel: { $elemMatch: // Správně. nejprve ve vloženém dokumentu zkontroluje položku visit s její podmínkou a pak zohlední rating
        { visits: { $gt: 2 }, rating: { $gt: 8 } } } } );

db.customers.find(
  { travel: { $elemMatch:
        { visits: { $gt: 2 }, rating: { $gt: 6, $lt: 9 } } } } );

db.customers.find(
  { travel: { $elemMatch:
        { country: "Thailand", visits: { $gt: 1 }, rating: { $gte: 9 } } } } );

//Nalézt documents pro zákazníka, který cestuje do Polska

db = db.getSiblingDB("sales");
db.getCollection("customers2").find(
  {
    "travel" : {
      "$elemMatch" : {
        "country" : "Poland"
      }
    }
  }
);

//Vymazání záznamů z db

db.customers.deleteMany( { _id: { $in: [ 1, 2, 3 ] } } );




