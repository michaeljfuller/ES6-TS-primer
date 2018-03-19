//<editor-fold desc="Basic">

/*
  TypeScript gives you the option of specifying types
  so the compiler will throw an error if the type used anywhere doesn't match the type expected.
*/

let myNum:number = 123;
let myBool:boolean = true;
let myStrings:string[] = ['foo', 'bar', 'baz'];
let myTuple:[string, number] = ['Bob', 30]; // Length and types must match

/*
  The 'any' type is the same as the default JS, where a value can be of any type
 */
let something: any = 'This can be anything';
something = 123; // And changed to anything else

/*
  Classes can also be used as a type
*/
class MyClass{}
let myInstance: MyClass = new MyClass(); // Class as a type

/*
  If the type a variable is initialised with is know at build time,
  TypeScript will infer it's of that type and it can be left unspecified
*/
let infered = 'string';

//</editor-fold>
//<editor-fold desc="Enums">

/*
  Basic enums are map to incrementing integers. The same integers can be passed back to get the key.
*/

enum Color { Red, Green, Blue }
console.log(Color);

/*
  Values can be specified if needed, where unspecified subsequent values will increment the previous
*/

enum ContentTypes { Activity=1, Assessment=4, Video }
console.log(ContentTypes);

/*
  Strings can also be used.
 */

enum UserType { Admin='admin', Teacher='teacher', Student='student'}
console.log(UserType);

/*
  When an enum is used as a type, it's referring to one of it's potential values.
*/

function expectUserType(type:UserType):void{
  console.log(type);
}
expectUserType(UserType.Admin);
// expectUserType('foo'); // Error: String isn't a UserType

//</editor-fold>
//<editor-fold desc="Additional return types">

function returnsNothing():void{
  console.log("The void return type specifies that nothing is returned");
  // return true;
}
// function error():never{
//   // throw new Error("The never type specifies that the method will never return");
// }

//</editor-fold>
//<editor-fold desc="Casting">

/*
  If you want to treat something as a different type than the compiler expects, or is aware of, you can cast it.
*/

let someValue: any = "The compiler treats this as the 'any' type.";
let strLength: number = (<string>someValue).length; // Cast to a string to use String.length.
let altStrLength: number = (someValue as string).length; // Alternate syntax

//</editor-fold>
//<editor-fold desc="Unions">

/*
  Sometimes a variable could be one of multiple types, separated by a pipe
*/

function log(value: string|number){
  console.log(value);
}
log('foo');
log(123);
// log(false); // Error: Not a string or number

//</editor-fold>
//<editor-fold desc="Aliases">

/*
  Types can also be given an alias.
  Aliases are the little brother of Interfaces, which come later.
*/

type IdAndName = [number, string];
type Reference = number | string;

let user:IdAndName = [1, 'Alice'];
let ref:Reference = '003';
ref = 3;

//</editor-fold>
//<editor-fold desc="Aliases">

/*
  The declare keyword is a hint to the IDE/compiler,
  letting it know about a variable that has been declared outside of its awareness.
*/

declare let myWindow:Window;

try{
  console.log(myWindow.history);
}catch(e){
  console.log(e); //Though it doesn't exist
}


//</editor-fold>