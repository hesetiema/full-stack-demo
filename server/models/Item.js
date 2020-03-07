const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  icon:{type:String}
})
//mongoose.model(modelName, schema)
module.exports = mongoose.model('Item',schema)