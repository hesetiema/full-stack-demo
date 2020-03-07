const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname + '/uploads'))

app.set('secret','psw123')

require('./routes/admin/index')(app)
require('./plugin/db')(app)


app.listen(3000, () => {
  console.log('App listening on http://localhost:3000!');
});
