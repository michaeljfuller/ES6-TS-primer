/*
  Symbols are a new JavaScript primitive.
  They're created with a method, rather than a constructor, so don't use the 'new' keyword.
  You can pass in a description, but it has no practical impact.
*/

let mySymbol = Symbol("My description");

console.log(mySymbol);
console.log(mySymbol.toString());

//<editor-fold desc="Uniqueness">

/*
  They can be used as unique variables on something.
  In this example, we have log levels as symbols, rather than strings or numbers,
  so you must pass a reference to the symbol, rather than try to imitate it.
*/

let Level = {
  High:   Symbol('High'),
  Medium: Symbol('Medium'),
  Low:    Symbol('Low')
};

function logMessage(message, level){
  switch(level){
    case Level.High:   return `High: "${message}"`;
    case Level.Medium: return `Medium: "${message}"`;
    case Level.Low:    return `Low: "${message}"`;
    default:           return "Unknown log level";
  }
}

console.log(logMessage("Hello", Level.Low));
console.log(logMessage("Hello", Level.Medium));
console.log(logMessage("Hello", Symbol('High')));

//</editor-fold>
//<editor-fold desc="Symbol registry">

/*
  While symbols are unique, there is a global registry for them.
  They are created/retrieved by a key, which also becomes their description.
  You can also reverse this, and see which key a symbol was registered with.
*/

let registrySymbol = Symbol.for('registry symbol');
console.log( registrySymbol.toString() );

console.log( registrySymbol === Symbol.for('registry symbol') );
console.log( registrySymbol === Symbol.for('another symbol') );

let unregisteredSymbol = Symbol();
console.log( Symbol.keyFor(registrySymbol) );
console.log( Symbol.keyFor(unregisteredSymbol) );

//</editor-fold>

//<editor-fold desc="As hidden properties">

/*
  Symbols can be used as non-iterable object keys,
  so they describe 'hidden' properties that are only found if you're looking for them.
  Good for adding metadata.
*/

let myObject = { name:'string' };
myObject[mySymbol] = "my value";
console.log( myObject );

// Get properties conventionally
for (let key in myObject) {
  console.log(key);
}
console.log( Object.keys(myObject) );
console.log( Object.getOwnPropertyNames(myObject) );

// Get symbol
console.log( myObject[mySymbol] );
console.log( Object.getOwnPropertySymbols(myObject)[0].toString() );

//</editor-fold>
//<editor-fold desc="Well-known symbols">

/*
  There are a set of "well-known symbols" that are used by JavaScript itself, that let you hack behavior.
  In this example, we configure the "instanceof" keyword using the "hasInstance" symbol,
  which is a key to a hidden method that returns a boolean.
*/

class MyClass {
  static [Symbol.hasInstance](input) {
    console.log(input);
    return true;
  }
}

console.log( 'a string' instanceof MyClass );

//</editor-fold>