class MyClass {}

/*
  Mixins let you "mix in" parts of classes, adding new members.
*/

function myMixin(classToMixin){
  return class extends classToMixin { // Return an anonymous class extending passed one
    mixer(){
      return "Mixed into '" + classToMixin.name + "'.";
    }
  }
}

/*
  Just wrap the mixin around a class you want to extend (you can also nest multiple mixins by the output of one )
 */

class MyMixedClass extends myMixin(MyClass){

}

let myMixedInstance = new MyMixedClass();
console.log(myMixedInstance.mixer());
