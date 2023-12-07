//Go to folder with before-mock.js  (root-of-server/app/_mock)
// Use mongo localhost:27017/jokesMainPrimary before-mock.js  OR
//Use mongod mongodb://127.0.0.1:27017/jokesMainPrimary before-mock.js
db.createCollection("users");

db.users.insertMany([
  { _uuIdentity: "0000-0000-2589-1532", _name: "Lucie Tichá", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1543-5486", _name: "Petr Novák", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2582-1533", _name: "Jana Křížová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1544-5487", _name: "Tomáš Procházka", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2583-1534", _name: "Eva Svobodová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1545-5488", _name: "Jan Kovář", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2584-1535", _name: "Kateřina Marešová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1546-5489", _name: "Pavel Novotný", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2585-1536", _name: "Zuzana Dvořáková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1547-5490", _name: "Michal Prokop", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2586-1537", _name: "Veronika Malá", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1548-5491", _name: "Jakub Navrátil", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2587-1538", _name: "Martina Růžičková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1549-5492", _name: "Hana Nováková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1550-5493", _name: "Tomáš Havel", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2588-1539", _name: "Ivana Nováková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1551-5494", _name: "Josef Vávra", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2589-1540", _name: "Karolína Konečná", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1552-5495", _name: "Miroslav Pospíšil", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2590-1541", _name: "Tereza Kovářová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1553-5496", _name: "David Svoboda", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2591-1542", _name: "Barbora Králová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1554-5497", _name: "Radek Nový", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2592-1543", _name: "Lenka Marečková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1555-5498", _name: "Šárka Vlčková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2593-1544", _name: "Ondřej Šebek", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1556-5499", _name: "Michaela Procházková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-2594-1545", _name: "Jakub Havlík", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
  { _uuIdentity: "0000-0000-1557-5500", _name: "Marie Šimáčková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
]);

