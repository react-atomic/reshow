var connect = require('./build/src/connect');
var connectFunctional = require('./build/src/connectFunctional');
module.exports.Container = {create: connect, createFunctional: connectFunctional};
module.exports.ReduceStore = require('./build/src/ReduceStore');
