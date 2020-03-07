const mongoose = require('mongoose')

//SchemaType.prototype.set()
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select:false, 
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})
//mongoose.model(modelName, schema)
module.exports = mongoose.model('AdminUser', schema)