// Getting time since start of script
const timestamp = Date.now();
const timeSinceStart = () => `${Date.now() - timestamp}ms`;

// Resolves a promise after 'delayMS' with 'data'
function waitAndResolve(data, delayMS) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delayMS);
  });
}

/*
  Async calls return a promise.
  They wait for the promise to resolve for any functions tagged with 'await'.
*/

async function asyncCall() {
  console.log(timeSinceStart());

  let result1 = await waitAndResolve('Result 1', 100);
  console.log(result1+". "+timeSinceStart());

  let result2 = await waitAndResolve('Result 2', 100);
  console.log(result2+". "+timeSinceStart());

  return `[${result1}, ${result2}]`;
}

/*
  This is the old equivalent of the asyncCall
*/

function promiseCall() {
  console.log(timeSinceStart());

  return waitAndResolve('Result 1', 100).then(
    function(result1){
      console.log(result1+". "+timeSinceStart());

      return waitAndResolve('Result 2', 100).then(
        function(result2){

          console.log(result2+". "+timeSinceStart());
          return `[${result1}, ${result2}]`;

        }
      );

    }
  );
}

console.log(timeSinceStart());

asyncCall().then(function(data){ console.log(data, timeSinceStart()) });
promiseCall().then(function(data){ console.log(data, timeSinceStart()) });

console.log(timeSinceStart());