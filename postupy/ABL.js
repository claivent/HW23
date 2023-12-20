const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yourSchema = new Schema({
  // ... ostatní pole
  position: { type: Number, default: 0 }, // pole určující pozici
});

const YourModel = mongoose.model('YourModel', yourSchema);

// Příklad aktualizace pozice záznamu
YourModel.updateOne({ _id: yourRecordId }, { position: newPosition }, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
