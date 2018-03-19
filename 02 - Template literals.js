//<editor-fold desc="Basic Syntax">

/*
  Previously called "template strings", these uses back-ticks ` rather than single/double quotations.
  Expressions/values can be added within the dollar-bracket ${} notation
*/
let a = 1, b = 2;
console.log(`${a} + ${b} = ${a+b}`);

/*
  It can also handle line breaks without a syntax error
*/

console.log(`Line
Break`);

//</editor-fold>
//<editor-fold desc="String Tags">

/*
  You can create a "tag" method to tailor the result of a template literal.
*/

let alice = {
  title: 'Mrs.',
  givenName: 'Alice',
  familyName: 'Smith'
};
let bob = {
  // title: 'Mr.',
  givenName: 'Bob',
  // familyName: 'Smith'
};
console.log( personTag`Hello, ${ alice } & ${ bob }!` );

/**
 * Formats the name of the passed 'person'.
 * @param {string[]} strings - Static text between passed values
 * @param {Array} people
 * @return {string}
 */
function personTag(strings, ...people) {
  console.log(strings);
  console.log(people);

  // Interlace values with strings
  let result = strings[0];// Always starts with a string, even if it's empty
  for (let i=0; i < people.length; i++){
    result += formatPersonString(people[i]) || 'guest';
    result += strings[i+1]; // Always one more string than passed value, even if it's empty
  }

  console.log(result);
  return result;
}
function formatPersonString(person){
  if (person){
    let nameParts = [];
    if (person.title) nameParts.push(person.title);
    if (person.givenName) nameParts.push(person.givenName);
    if (person.familyName) nameParts.push(person.familyName);
    return nameParts.join(' ');
  }
  return '';
}

//</editor-fold>
//<editor-fold desc="Other tags">

/*
  But tags can also return things other than strings too.
  This mock example shows how a template literal could be turned into a HTTP request.
*/

let userId = 1;
requestTag`www.example.com/user/${userId}`.then(
  function(data) { console.log(data);  },
  function(error){ console.log(error); }
);

function requestTag(strings, userId){
  if (typeof userId === 'number') {
    return Promise.resolve({id: userId, username: 'user' + userId, age: 28});
  }else{
    return Promise.reject("userID is not a number.");
  }
}

//</editor-fold>
