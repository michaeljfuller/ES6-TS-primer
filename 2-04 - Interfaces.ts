/*
 Interfaces specify the properties/members that should be expected on an object/instance/function
*/

//<editor-fold desc="Basics">

interface NamedObject {
  /*
    Must have a name string
  */
  name:string
  /*
   The question mark means that a 'type' string _could_ exist
  */
  type?:string
}

/*
  Expects 'target' to fulfil the conditions of NamedObject
*/
function greeting( target:NamedObject ):string{
  let result = "Hello, ";
  if (target.type) result += target.type + ' ';
  result += target.name;
  return result;
}

let person = { name: 'Bob', age: 35 }; // Has name and age
console.log( greeting(person) );

let animal = { name: 'Alice', type: 'Cat' }; // Has name and type
console.log( greeting(animal) );

let car = { color: 'red' }; // No 'name'
// console.log( greeting(car) ); // Compiler error & IDE warning

//</editor-fold>
//<editor-fold desc="Inheritance">

/*
  One interface can extend one or more other interfaces.
 */

interface AgedObject { age: number }

interface IPerson extends NamedObject, AgedObject { // Multiple inheritance
  title?: string
}

/*
  Classes can implement one or more Interfaces, and they must meet all the interface constraints.
*/

class Person implements IPerson {
  title: string;
  name: string;
  age: number;
  constructor(name:string, title:string, age:number){
    this.name = name;
    this.title = title;
    this.age = age;
  }
}

//</editor-fold>
//<editor-fold desc="Generalising">

/*
  You can also generalise any unspecified properties to be of a specific type
*/

interface PersonMap {
  mapName:string;
  [propName: string]: Person; // Any other properties asked for with a string key, will have Person as a value
}
function personMapString(map:PersonMap):string[]{
  let result = [];

  for (let key in map){
    if (map[key] instanceof Person) {
      result.push(`${key}: ${map[key].name}`);
    }
  }

  return map.mapName+" >> "+result.join(', ');
}
let filtered = personMapString({
  mapName: 'Roster',
  '001': new Person('Alice Smith',   'Mrs', 32),
  '002': new Person('Bob Smith',     'Mr',  28),
  '003': new Person('Charlie Smith', 'Dr',  25)
});
console.log(filtered);

//</editor-fold>
//<editor-fold desc="Function interface">

/*
  Interfaces can also be made for functions, expecting given parameter and return types.
  This is particularly useful for callbacks.
*/

/*
  This expects two numbers and returns a string
*/
interface MyCallback {
  (a: number, b: number): string;
}

function passTwoRandomNumbers(callback:MyCallback):string{
  let a=Math.floor(Math.random()*100);
  let b=Math.floor(Math.random()*100);
  return callback(a, b);
}

let result = passTwoRandomNumbers(
  (a,b) => `${a} + ${b} = ${a+b}`
);
console.log(result);

//</editor-fold>