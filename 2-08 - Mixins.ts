/*
  TypeScript has a different approach to mixins than vanilla JavaScript.
  It's a bit of a hack, but it's outlined on the official website.
*/

/*
  Classes to mix-in
 */
class MixinA {
    propertyA: string = '';
    methodA(str:string):string{
        return this.propertyA = str;
    }
}
class MixinB {
    propertyB: boolean = false;
    methodB():boolean{
        return this.propertyB = !this.propertyB;
    }
}

/*
  The use of the 'implements' keyword treats the subsequent classes' definitions as interfaces.
 */
class ClassToMix implements MixinA, MixinB {
  /*
    Properties defined in mixins, to satisfy 'implements' for the compiler, and set initial values.
   */
  propertyA: string = 'something';
  propertyB: boolean = false;

  /*
   Stand-in methods in mixins, to satisfy 'implements' for the compiler.
  */
  methodA: (str:string) => string;
  methodB: () => boolean;
}
/*
  Apply mixins to the class
 */
applyMixins(ClassToMix, [MixinA, MixinB]);

/*
  Create an instance
 */
let instance = new ClassToMix();

/*
  Call MixinA method
 */
console.log(instance.propertyA);
instance.methodA('Hello');
console.log(instance.propertyA);

/*
  Show method that accepts something fulfilling the definition of MixinB
 */
function toggleB(target:MixinB):void{
  target.methodB();
}

console.log(instance.propertyB);
toggleB(instance);
console.log(instance.propertyB);

/**
  This is a function that applies the mixins
*/
function applyMixins(targetClass: any, mixinClasses: any[]) {
  // For each mixin
  mixinClasses.forEach(
    function(mixinClass){
      // For each mixin property
      Object.getOwnPropertyNames(mixinClass.prototype).forEach(
        function(name){
          // Apply mixin property onto target
          console.log(name);
          targetClass.prototype[name] = mixinClass.prototype[name];
        }
      );
    }
  );
}
