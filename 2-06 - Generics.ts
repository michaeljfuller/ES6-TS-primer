//<editor-fold desc="Generic method">

/*
  Generic methods allow for the types a method uses to be declared on each call,
  and each call can use a different type.
*/

function combine<T, U>(first:T, second:U):[T,U]{
  return [first, second];
}

let tuple:[number, string] = combine<number, string>(1, 'two');
// tuple[0] = 'a string';

//</editor-fold>
//<editor-fold desc="Generic class">

/*
  Generics can also be used in classes and interfaces.
  In this example, 'T' is the type of array 'members' becomes.
*/

class Roster<T> {
  name:string;
  members: T[] = [];
  constructor(public name:string){}
}

interface Named { name:string }
class Person implements Named{
  constructor(public name:string){}
  public sayHi():string{ return `${this.name}: "Hi!"`; }
}

/*
  This is a roster full of 'Person' instances.
*/
const personRoster = new Roster<Person>("personRoster");
console.log(personRoster);

personRoster.members.push(new Person('Bob'));
console.log(personRoster);

// personRoster.members.push("foo"); // Isn't a Person

//</editor-fold>
//<editor-fold desc="Constraints">

/*
  Generic types can also be constrained to be or extend a particular class, or match an interface
*/

/*
  This method only accepts any type that extends 'Named',
  and if one isn't specified id defaults to Person.
*/
function changeName<T extends Named = Person>(obj:T, name:string):T{
  obj.name = name;
  return obj;
}
let person = changeName(new Person('Alice'), 'Bob');
console.log( person.sayHi() );

//</editor-fold>
