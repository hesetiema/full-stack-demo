const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  avatar:{type:String},
  title:{type:String},
  categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
  scores:{
    difficult:{type:Number},
    skills:{type:Number},
    attack:{type:Number},
    survive:{type:Number},
  },
  skills:[{
    icon:{type:String},
    name:{type:String},
    coolAndExpend:{type:String},
    description:{type:String},
  }],
  itemsGo:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
  itemsBack:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
  usageTips:{type:String},
  battleTips:{type:String},
  teamTips:{type:String},
  partners:[{
    hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},
    description:{type:String}
  }]

})
//mongoose.model(modelName, schema)
module.exports = mongoose.model('Hero',schema)