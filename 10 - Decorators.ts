/*
  Decorators let you modify/extend the passed class/method/property/parameter.
  They're an experimental feature while the JS draft is being finalised,
  so they need enabling in tsconfig.json, unless it's an Angular project where they're already enabled.
*/

//<editor-fold desc="Class decorator">

import get = Reflect.get;
interface IGreeter{
  new(name:string):IGreeter
  greeting():string
}

/** Get the first class in ancestor chain with the passed key. */
function getAncestorWith<T extends Function = Function>(key:string, target:T):T{
  while(target && key in target === false){
    target = target.prototype;
  }
  return target;
}

/*
  This class decorator takes an IGreeter and wraps the original greeting method,
  adding exclamations to the result.
*/

function exclaimGreeting(constructor:IGreeter){
  const prototype = getAncestorWith<IGreeter>('greeting', constructor);
  const original = prototype.greeting;

  console.log(constructor);
  console.log(prototype);
  console.log(original);

  prototype.greeting = function(){
      return original.call(this) + "!!!";
  };

  return constructor;
}

/*
  Unmodified greeter
*/
//noinspection JSAnnotator - Suppress a warning for constructor interface the IDE doesn't recognise yet.
class NormalGreeting implements IGreeter{
  constructor(private name:string) { }

  public greeting():string{
    return "Hello, "+this.name;
  }
}

@exclaimGreeting // Attach decorator with @ symbol, above class, WITHOUT parenthesis.
class ExclaimedGreeting extends NormalGreeting{}

console.log( ( new NormalGreeting("Bob")    ).greeting() );
console.log( ( new ExclaimedGreeting("Bob") ).greeting() );

//</editor-fold>
//<editor-fold desc="Class decorator factory">

/*
  You can also create a Decorator factory,
  that returns a decorator customised by the passed parameters.
*/

function customGreeting(prefix:string='Hello, ', suffix:string='.'){
  return function (constructor:IGreeter){
    const prototype = getAncestorWith<IGreeter>('greeting', constructor);
    const original = prototype.greeting;

    console.log(constructor);
    console.log(prototype);
    console.log(original);

    prototype.greeting = function(){
      return prefix + this.name + suffix;
    };

    return constructor;
  }
}

@customGreeting('Hey, ') // Attach decorator factory with @ symbol, above class, WITH parenthesis.
class FactoryGreeting extends NormalGreeting{}

console.log( ( new FactoryGreeting("Bob") ).greeting() );

//</editor-fold>
//<editor-fold desc="Functor decorator">

/*
  Methods in classes/objects can also have a decorator.
  Like class decorators, they can also have factory to create a decorator.

  In this example, the logGroup function decorator adds a console group
  around the method to help with debugging.
*/

function logGroup(instance:any, propertyKey:string, descriptor:PropertyDescriptor){
  // Get descriptor if not already provided, which may be the case for non-instance-member functions
  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(instance, propertyKey);
  }

  // You have access to the whole descriptor
  console.log(descriptor.value);
  console.log(descriptor.get);
  console.log(descriptor.set);
  console.log(descriptor.configurable);
  console.log(descriptor.writable);
  console.log(descriptor.enumerable);

  // Override method in descriptor
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {

    // Get group name
    let groupName = propertyKey;
    let className = instance && instance.constructor && instance.constructor.name;
    if (className) groupName = className+'.'+groupName;
    let argTypes = args.map(arg => typeof arg);
    groupName += `(${argTypes.join(',')})`;
    console.log(groupName);

    // Wrap originalMethod in console group, listing arguments
    console.group(groupName);
    console.log(arguments);
    try{
      const result = originalMethod.apply(instance, args);
      if (result !== undefined){
        console.log("Result:", result);
      }
      return result;
    }catch(e){
      console.warn(e);
      throw e;
    }finally{
      console.groupEnd();
    }

  };

  // Re-apply descriptor and return
  Object.defineProperty(instance, propertyKey, descriptor);
  return descriptor;
}

class LoggedMethods {
  @logGroup
  public foobar(prefix:string='', suffix:string=''):string{
    return prefix + this.foo() + this.bar() + suffix;
  }
  @logGroup private foo(){ return "Foo"; }
  @logGroup private bar(){ return "Bar"; }
}

console.log( (new LoggedMethods).foobar("Message: ", "!") );
/*
  + LoggedMethods.foobar(string,string)
    - Arguments(1) ["Message: ", "!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    + LoggedMethods.foo()
      - Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
      - Result: Foo
    + LoggedMethods.bar()
      - Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
      - Result: Bar
    - Result: Message: FooBar!
*/

//</editor-fold>
//<editor-fold desc="Property decorator">

/*
  Properties can also have decorators.

  In this example, we replace a property with get/set so we can call console.log() when it's used.
*/

function logProperty(target:Object, key:string){
  // Get name to use it in the log
  let className = target && target.constructor && target.constructor.name;
  let name = key;
  if (className) name = className+"."+name;

  // Value is hosted here now
  let value = target[key];

  // Getter and setter to replace property
  const getter = () =>  {
    console.log(name, '>>', value);
    return value;
  };
  const setter = (newValue) => {
    console.log(name+':', value, '<<', newValue);
    value = newValue;
  };

  // Replace original property with the above.
  Reflect.defineProperty(target, key, { get: getter, set: setter });
}

class LoggedProperties{
  @logProperty
  text:string='original';
}

let loggedProp = new LoggedProperties;
loggedProp.text = 'updated';
console.log(loggedProp.text);
/*
   LoggedProperties.text: undefined << original
   LoggedProperties.text: original << updated
   LoggedProperties.text >> updated
*/

//</editor-fold>
