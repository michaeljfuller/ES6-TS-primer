//<editor-fold desc="Creation">

/*
  A proxy keeps a reference to the object it is a proxy for,
  but it can have its implement of the Reflection API overwritten separately.
*/

let myObject = {
  first: 'First'
};
let myProxy = new Proxy(myObject, { // A proxy for myObject
  get: () => "Proxy override"       // where any requested property value is replaced with a string
});

console.log(myObject);
console.log(myProxy);

myObject.second = "Second";          // Add a new property
myProxy.first = "Modified on proxy"; // Modify property on proxy to see if it's updated

console.log(myObject.first+", "+myObject.second);
console.log(myProxy.first+", "+myProxy.second);

//</editor-fold>
//<editor-fold desc="Example 1">

/*
  This example creates an infinitely chainable url builder.
  Each point in the chain refers to a path directory.
*/

function urlBuilder(domain) {
  let paths = [];
  let proxy = new Proxy(
    // Proxy wraps a method which, when called,
    // creates a string from the passed domain, hash, and each property name requested below.
    function (hash) {
      let returnValue = domain + '/' + paths.join('/');
      if (hash) {
        returnValue += '#'+hash;
      }
      paths = [];
      return returnValue;
    }, {
      // Has any property
      has: () => true,

      // When a property is accessed,
      // add the property name to the paths array,
      // and return itself for chaining.
      get: function (object, prop) {
        paths.push(prop);
        return proxy;
      }
    }
  );
  return proxy;
}

let site = urlBuilder('http://example.com');
// 'site' is the proxy.
// When 'user' is requested, add 'user' to the paths list.
// When 'post' is requested, add 'post' to the paths list.
// When '[1]' is requested, add '1' to the paths list.
// Function call refers to the function the proxy wraps, ending the chain.
console.log( site.user.post[1]('baz') );

//</editor-fold>
//<editor-fold desc="Example 2">

/*
  Hide all properties from enumeration
*/

let visible = {
  foo: 1,
  bar: 2
};

let hidden = new Proxy(visible, {
  has: () => false,
  ownKeys: () => [],
  getOwnPropertyDescriptor: () => false,
});

console.log( visible );
console.log( hidden );

//</editor-fold>
//<editor-fold desc="Revocable">

/*
  You can also create a proxy that can be revoked.
*/

myObject = {
  first: 'First'
};
let revocable = Proxy.revocable(
  myObject,
  { get: () => "Proxy override" }
);
myProxy = revocable.proxy;

console.log( myObject );
console.log( myProxy );
console.log( myProxy.first );

revocable.revoke();
try {
  console.log(myProxy);
}catch(e){
  console.log(e);
}

//</editor-fold>
