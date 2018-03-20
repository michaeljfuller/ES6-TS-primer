/*
  Namespaces are a handy way to isolate code, choosing what's accessible.
*/

namespace MyNamespace {
  // Export a value calculated inside the namespace
  let a=1, b=2;
  export let myNumber = a+b;

  // Export a function
  export function getThis(){
    return this;
  }

  export interface MyInterface{
    name:string;
  }

  // Export a class
  export class MyClass implements MyInterface{
    constructor(public name:string){}
  }

  export namespace Subdomain {
    export const CONSTANT = 'CONSTANT;'
  }
}

/*
  Get and modify a variable
*/

console.log( MyNamespace.myNumber );
MyNamespace.myNumber++;
console.log( MyNamespace.myNumber );

/*
  Call a function returning the namespace object
*/

console.log( MyNamespace.getThis() );

/*
  Instantiate a namespace class
 */
console.log( new MyNamespace.MyClass('MyInstance') );

/*
  Get a sub-namespace's constant and attempt to replace it.
 */
console.log( MyNamespace.Subdomain.CONSTANT );
// MyNamespace.Subdomain.CONSTANT = "replace";

/*
  otherFile is actually defined in "/misc/other-namespace-file.ts", and is recognised by the IDE.
*/

MyNamespace.otherFile;