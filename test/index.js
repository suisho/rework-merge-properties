var rework = require("rework")
var compute = require("../index")
var fs = require("fs")
var assert = require("assert")

var assertFixture = function(dir){
  var input = fs.readFileSync("./fixture/"+dir+"/input.css", "utf-8")
  var output = fs.readFileSync("./fixture/"+dir+"/output.css", "utf-8").trim()
  var result = rework(input).use(compute).toString().trim()
  assert.equal(output, result)
}

describe("", function(){
  ["basic", "important"].forEach(function(dir){
    it(dir, function(){
      assertFixture(dir)
    })
  })
})
