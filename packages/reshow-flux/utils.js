var create = require('./build/src/Container');
var createFunctional = require('./build/src/FunctionalContainer');
module.exports.Container = {create: create, createFunctional: createFunctional}; 
module.exports.ReduceStore = require('./build/src/ReduceStore');
