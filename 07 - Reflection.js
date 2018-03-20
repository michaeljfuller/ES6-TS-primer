/*
  The reflection API is a helpful set of methods to inspect objects.
  It serves as a replacement to the static methods on Object/Function that did similar things.
*/

//<editor-fold desc="Construct">

/*
  The construct reflection method lets you call a constructor,
  similar to how you would Function.apply().
*/

class MyClass{
  constructor(a, b, c){
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

let myInstance = Reflect.construct(MyClass, ['A string', Math.PI, false]);
console.log( myInstance );

//</editor-fold>
//<editor-fold desc="Apply">

/*
  The apply reflection method a simpler version of
  Function.prototype.apply.call(myFunction, myTarget, myArgsArray);
*/

// Get named properties from 'this'
function getMembersFromThis(...keys){
  let result = {};
  if (this) {
    keys.forEach(key => result[key] = this[key]);
  }
  return result;
}

console.log( Reflect.apply(getMembersFromThis, myInstance, ['c', 'a', 'foo']) );

//</editor-fold>
//<editor-fold desc="Define/get/delete property">

/*
  Reflect.defineProperty() is similar to Object.defineProperty(),
  but the name doesn't apply that it's only applicable to objects.
  Here it is used on a function.
*/

const myCallback = () => true;
Reflect.defineProperty(myCallback, 'something', { value: "SOMETHING" });

console.log( myCallback.something );

/*
  Likewise, Reflect.getOwnPropertyDescriptor replaces the object equivalent.
*/

console.log(
  Reflect.getOwnPropertyDescriptor(myInstance, 'a')
);

/*
 deleteProperty() does as you'd expect
*/

console.log( myInstance.c );
Reflect.deleteProperty( myInstance, 'c' );
console.log( myInstance.c);
console.log( 'c' in myInstance );

//</editor-fold>

/*
  There are more methods in the reflection API to explore.
*/