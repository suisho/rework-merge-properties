var rework = require("rework")
var compute = require("../index")
var fs = require("fs")
var assert = require("assert")

var assertFixture = function(dir, fn){
  var input = fs.readFileSync("./fixture/"+dir+"/input.css", "utf-8")
  var output = fs.readFileSync("./fixture/"+dir+"/output.css", "utf-8").trim()
  var result = rework(input).use(fn).toString().trim()
  assert.equal(output, result)
}

describe("", function(){
  [
    "basic",
    "important",
    "prop_order",
    //"same_class"
  ].forEach(function(dir){
    it(dir, function(){
      assertFixture(dir, compute.property)
    })
  })
})
