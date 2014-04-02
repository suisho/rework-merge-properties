var rework = require("rework")
var compute = require("../index")
var fs = require("fs")
var assert = require("assert")

var assertFixture = function(dir){
  var input = fs.readFileSync("./fixture/"+dir+"/input.css", "utf-8")
  var output = fs.readFileSync("./fixture/"+dir+"/output.css", "utf-8")
  assert(output, rework(input).use(compute).toString())
}

describe("", function(){
  it("basic usage", function(){
    assertFixture("basic")
  })
})
