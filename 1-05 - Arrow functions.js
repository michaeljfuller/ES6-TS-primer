//<editor-fold desc="Syntax">

/*
  There's a new way to define functions, specifically tailored for callbacks.
*/

const arrowFunction = (arg1, arg2) => {
  console.log("arrowFunction", arg1, arg2);
};
arrowFunction('hello', 'world');

/*
  To make it even smaller, you can skip the parenthesis before the arrow if there's only one parameter.
  If you also exclude the braces after the arrow, the statement after the arrow will be used as the return value.
*/

const arr = ['one', null, 'two', 'three', null];
let filtered = arr.filter(val => val !== null); // Don't filter where val !== null

console.log(arr);
console.log('Filtered:', filtered);

//</editor-fold>
//<editor-fold desc="Scope">

new MyClass("MyInstance"); // Create new MyClass, with the name "MyInstance"
function MyClass(name) {
   this.name = name;

   /*
      "this" inside a normal function callback of setTimeout is actually the global object
      (e.g. Window), which is probably unexpected.
      Normal functions have their own 'arguments' property, to describe the call.
   */

   setTimeout(
     function normalFunction() {
       console.log(arguments);
       console.log(arguments.callee.name);
       console.log(this);
     }, 0
   );

   /*
      An arrow function callback doesn't have it's own "this", so "this" actually refers to the
      value used in the parent scope, which is the class instance, which is probably what's expected.
      Arrow functions also don't have their own 'arguments' property,
      so it actually refers to the 'arguments' of the parent scope, which is the class constructor.
   */

   setTimeout(() => {
     console.log(arguments);
     console.log(arguments.callee.name);
     console.log(this);
   }, 0);
}

//</editor-fold>