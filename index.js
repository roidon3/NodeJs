//This is using JS
// import add from "./math.js"
// console.log(add(4,5));
//to use module export add this in package.json - "type":"module",
//if you write export default no need to add {} while importing else you need to add

//This is using Node js to use this remobve this from (  "type":"module",) from package.json
const math = require("./math.js")
//there are mnamy module such as fs module,http module
//instead of using math we can also destructure the va;ues {add,sub,mul,div}
console.log(math.add(3, 4), "This is addition");
console.log(math.sub(3, 4), "This is subtration");
console.log(math.mul(3, 4), "This is multiplication");
console.log(math.div(3, 4), "This is division");
