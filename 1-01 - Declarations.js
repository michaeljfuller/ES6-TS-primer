//<editor-fold desc="Hoisting">

/*
  Variables not declared anywhere throw an error
*/

try{
  console.log(myUndeclared);
}catch(e){
  console.error(e.message); // myUndeclared is not defined
}

/*
  'var' always declares a variable from the top of the scope,
  so using it before it's declared doesn't cause an error.
  This is called "hoisting"
*/

console.log(myVar);
var myVar = 1;
console.log(myVar);

/*
  'function' is also "hoisted"
*/
logHello();
function logHello(){ console.log("Hello!"); }

//</editor-fold>
//<editor-fold desc="let">

/*
  'let' variables will only be declared at the intended point.
  Using it earlier should result in an error, but this depends on what's processing it.
  A compiler/environment (TypeScript/Babel/Node/Browser) may choose to;
  throw a build-time error/warning, run-time error/warning, or let it pass.
*/

try {
  console.log(myLet);
}catch(e){
  console.log(e);
}

let myLet = 1;
console.log(myLet);

/*
  'let' is also "block scoped", which meas it's not available outside the block it's defined in.
*/

if (true){
  let myBlockedLet = 'test';
  console.log(myBlockedLet);
  if (true){
    console.log(myBlockedLet);
  }
}
try {
  console.log(myBlockedLet);
}catch(e){
  console.log(e);
}

//</editor-fold>
//<editor-fold desc="const">

/*
  'const' follows the same declaration rules as let, but it cannot be redefined.
*/

const myConst = 1;
try {
  myConst = 2;
}catch(e){
  console.log(e);
}
try {
  myConst++;
}catch(e){
  console.log(e);
}

/*
  'const' doesn't mean that an object is "immutable" (cannot be updated)
*/

const constArray = [1,2,3];
console.log(constArray);
constArray.push(4);
console.log(constArray);

//</editor-fold>
//<editor-fold desc="class">

/*
  While 'function' is hoisted, the new 'class' keyword isn't.
*/

try{
  console.log(new MyClass());
}catch(e){
  console.log(e);
}

class MyClass{}

new MyClass();

//</editor-fold>
