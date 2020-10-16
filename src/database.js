let mongoose = require('mongoose');

const server = '124.82.66.178/32'; //replace with db server
const database = 'idkwhichname';       //replace with db name

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()
