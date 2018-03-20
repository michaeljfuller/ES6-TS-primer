/*
  Question marks after the name indicate the field is optional.
  You can add equals to set a default value;
*/

function optional(a:string, b?:string="DefaultB"):void{
  return a + " " + b;
}

console.log( optional() );
console.log( optional("Ayyy") );
console.log( optional("Ayyy", "Beee") );

/*
  'this' parameter works as a hint to the IDE/compiler, telling it what type 'this' should be, or none at all if void.
*/

function callback(this:XMLHttpRequest){
  this.send();
}

/*
  Overloading means you can have multiple method signatures share the same name.
  They can have a different argument count, types and return type.
  There needs to be a single concrete function that represents each of its overloads.

  Note: The order of overrides is important.
  The most specific argument lists should come before more general ones, as TypeScript picks the first
  that meets the given conditions, rather than try to figure out which it thinks is best.
*/

function overloaded(num:number, str:string): string;
function overloaded(str:string): number;
function overloaded(): string;

function overloaded(arg1:any, arg2:any):any {
  // function overloaded(): string;
  if (arguments.length === 0){
    return "Nothing passed";
  }

  // function overloaded(str:string): number;
  if (typeof arg1 === 'string') {
    let str:string = arg1;
    return str.length;
  }

  // function overloaded(num:number, str:string): string;
  if (typeof arg1 === 'number' && typeof arg2 === 'string') {
    let num:number = arg1;
    let str:string = arg2;
    let result = '';
    for (let i=0; i<num; i++) result += str;
    return result;
  }

  throw new Error("Unhandled signature: "+(typeof arg1)+","+(typeof arg2));
}

// function overloaded(): string;
console.log( overloaded()       );

// function overloaded(str:string): number;
console.log( overloaded("One")  );

// function overloaded(num:number, str:string): string;
console.log( overloaded(3, "!") );

try {
  console.log(overloaded(false));
}catch(e){
  console.log(e);
}

