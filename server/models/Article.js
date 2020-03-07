const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:{type:String},
  categories:{type:mongoose.SchemaTypes.ObjectId, ref:'Category'},
  body:{type:String}
})
//mongoose.model(modelName, schema)
module.exports = mongoose.model('Article',schema)