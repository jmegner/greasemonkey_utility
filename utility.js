"use strict";


function execLogWrappedFunc(funcToWrap, ...funcArgs)
{
  try
  {
    return funcToWrap(...funcArgs);
  }
  catch(err)
  {
    console.error(err);
    throw err;
  }
}


function makeLogWrappedCallback(funcToWrap)
{
  return function(...funcArgs) { return execLogWrappedFunc(funcToWrap, ...funcArgs); };
}


function startCancellableInterval(periodicFunc, intervalMs)
{
  var wrappedPeriodicFunc = () => execLogWrappedFunc(periodicFunc, timerId);
  var timerId = setInterval(wrappedPeriodicFunc, intervalMs);
}


function logDocumentMutations()
{  
  (new MutationObserver(makeLogWrappedCallback( changes => console.debug(changes) ))).observe(
    document,
    {childList: true, subtree: true});
}


/*
// ####################################################################################
// EXAMPLES
// ####################################################################################

// makeLogWrappedCallback example #####################################################

(new MutationObserver(makeLogWrappedCallback(observeSomething))).observe(
  document,
  {childList: true, subtree: true});

function observeSomething(changes, observer)
{
  var desiredThing = document.querySelectorAll(".the-thing");

  if(desiredThing)
  {
    console.log("saw the thing", desiredThing);
    observer.disconnect();
  }
}


// startCancellableInterval example #####################################################

startCancellableInterval(checkForSomething, 1000);

function checkForSomething(timerId)
{
  var desiredThing = document.querySelectorAll(".the-thing");
  
  if(desiredThing)
  {
    console.log("saw the thing", desiredThing);
    clearInterval(timerId);
  }
}

*/
