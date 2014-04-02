var walk = require("rework-walk")
var defaults = require("defaults")
// put regexp local value for performance.
var importantRegexp = new RegExp()
importantRegexp.compile(/.*\!important.*/)

module.exports = function(style){
  // compute same property
  walk(style, function(rules, node){
    rules.declarations = computeDeclaration(rules.declarations)
  })
}


var computeDeclaration = function(decls){
  var flat = {}
  var important = {}
  var order = []

  decls.forEach(function(decl){
    // add to hash
    var container = isImportant(decl.value) ? important : flat
    container[decl.property] = decl

    // detect order
    var orderIdx = order.indexOf(decl.property)
    if(orderIdx > -1){
      order.splice(orderIdx, 1)
    }
    order.push(decl.property)
  })

  var computed = []
  // ordering
  order.forEach(function(prop){
    var decl = flat[prop]
    if(important[prop]){
      decl = important[prop]
    }
    computed.push(decl)
  })
  return computed
}


var isImportant = function(value){
  return importantRegexp.test(value)
}
