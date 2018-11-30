const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync'); //prefer use async
const adapter = new FileSync('db.json');

const db = low(adapter);

db.defaults({users: [], sessions: []})
    .write();

module.exports = db;