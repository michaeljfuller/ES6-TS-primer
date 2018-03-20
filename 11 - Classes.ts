/*
 TypeScript builds upon ES6 classes
*/

//<editor-fold desc="Members">

class MyClass {
  /*
    Properties can be declared here rather than just in the constructor,
    so they form part of the classes definition.
  */
  public name: string;   // Public can be used by anything
  private id: number;    // Private can only be used inside this class
  protected age: number; // Protected can only be used inside this class or a sub-class

  /*
    Read-only means the property can only be initialised either here or in the constructor
   */
  public readonly type: string;

  /*
    Static means the property belongs to the class itself, rather than an instance,
    so access it with `MyClass.nextId`, rather than `this.nextId`.
  */
  private static nextId: number = 0;

  /*
   Static methods work like static properties. "this" is the class itself.
   */
  public static getNextId():number{
    return this.nextId;
  }

  /*
    If a constructor argument has an "access modifier" (public, private, protected, readonly)
    then it is defined as being a member and the passed value is automatically assigned.
  */
  constructor(type:string, private color:string="none") {
    this.type = type;
    this.id = MyClass.nextId++;
  }
}

console.log( MyClass.getNextId() );
console.log( new MyClass("first", "red") );

console.log( MyClass.getNextId() );
console.log( new MyClass("second") );

//</editor-fold>
//<editor-fold desc="Abstract">

/*
  TypeScript has abstract classes, which can only be used to extend other classes,
  and not be instantiated themselves.
 */

abstract class MyAbstractClass {
  /*
    Extending classes must implement this
   */
  abstract abstractMethod(msg:string): void;

  /*
    Extending class can use this
   */
  predefinedMethod(msg:string): void {
    console.log("predefinedMethod", msg);
  }
}

/*
  Cannot create an instance of an abstract class
*/
// new MyAbstractClass;

/*
  Since this extends an abstract class, and is not abstract itself, it must define the abstract methods.
 */
class MyImplementingClass extends MyAbstractClass {
  abstractMethod(msg:string): void {
    console.log("abstractMethod", msg);
  }
}

let myInstance = new MyImplementingClass;
// myInstance.abstractMethod("foo");
// myInstance.predefinedMethod("bar");

//</editor-fold>