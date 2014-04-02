var visit = require('rework-visit')

module.exports = function(style, rework){
  return function(style){
    visit(style, function(declarations){
      console.log(declarations)
    })
  }
}
