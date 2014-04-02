var walk = require("rework-walk")
var defaults = require("defaults")
var uniq = require("uniq")
// put regexp local value for performance.
var importantRegexp = new RegExp()
var without = require("lodash.without")
importantRegexp.compile(/.*\!important.*/)

module.exports = function(style){
  // compute declarations
  walk(style, function(rules, node){
    rules.declarations = computeDeclaration(rules.declarations)
  })
}

var orderPush = function(order, prop){
  order = without(order, prop)
  order.push(prop)
  return order
}

var computeDeclaration = function(decls){
  var flat = {}
  var important = {}
  var order = []
  decls.forEach(function(decl){
    // add to hash
    var container = isImportant(decl.value) ? important : flat
    container[decl.property] = decl

    // set order
    order = orderPush(order, decl.property)
  })

  // ordering
  var computed = []
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
