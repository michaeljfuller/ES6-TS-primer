//<editor-fold desc="Enhanced object literals">

/*
  Enhanced object literals have a shorthand that allows object properties
  to be initialised with the name of the value passed in.
*/
let givenName = 'Bob';
let familyName = 'Smith';
let person = { givenName, familyName }; // Same as: { givenName: givenName, familyName: familyName }
console.log(person);

/*
  It's common to see this on export statements;
    module.exports = { givenName, familyName }
    export { givenName, familyName }
*/

//</editor-fold>
//<editor-fold desc="Destructuring">

/*
  Destructuring is a shorthand to break down a complex value, like an object or array.
 */

let anArray = [1,2,3,4,5];
let [first, second, third] = anArray; // Same as: let first=anArray[0], second=anArray[1], third=anArray[2];
console.log(first, second, third);

let anObject = { foo: 'FOO', bar: 'BAR', baz: 'BAZ'};
let {foo, bar} = anObject; // Same as: let foo=anObject.foo, bar=anObject.bar;
console.log(foo, bar);

/*
  It's common to see destructuring on import statements;
    const { givenName, familyName } = require('person');
    import { givenName, familyName } from 'person';
*/

//</editor-fold>
//<editor-fold desc="Rest parameter">

/*
  The rest parameter can be used to convert parameters into an array.
 */

/**
 * @param {string} name
 * @param {...number|string} otherParams
 */
function log(name, ...otherParams){
  console.log(name);
  console.log(otherParams);
}

log("numbers", 1, 2, 3);

//</editor-fold>
//<editor-fold desc="Spread operator">

/*
  The spread operator does the exact opposite of rest.
  It expands an array/object into multiple arguments.
*/

console.log("Passing:", ...anArray, "!");
// Same as: console.log("Passing:", anArray[0], anArray[1], anArray[2], anArray[3], anArray[4], "!");

/*
  You can combine enhanced object literals with the spread operator to do a shallow clone of an object or array
*/

let clone = { ...person };
console.log(clone);

let arrayCopy = [...anArray];
console.log(arrayCopy);

//</editor-fold>
