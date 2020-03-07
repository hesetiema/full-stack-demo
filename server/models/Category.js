const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}
})
//mongoose.model(modelName, schema)
module.exports = mongoose.model('Category',schema)