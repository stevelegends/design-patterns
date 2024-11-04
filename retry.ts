/**
 * @param promiseFactory A function that returns a promise to resolve
 * @param nthTry Number of tries before rejecting
 * @desc Retries a promise n no. of times before rejecting.
 * @returns resolved promise
 */
async function retryPromise<T>(promiseFactory: () => Promise<T>, nthTry: number): Promise<T> {
  try {
    // try to resolve the promise
    const data = await promiseFactory();
    // if resolved simply return the result back to the caller
    return data;
  } catch (e) {
    // if the promise fails and we are down to 1 try we reject
    if (nthTry === 1) {
      return Promise.reject(e);
    }
    // if the promise fails and the current try is not equal to 1
    // we call this function again from itself but this time
    // we reduce the no. of tries by one
    // so that eventually we reach to "1 try left" where we know we have to stop and reject
    console.log('retrying', nthTry, 'time');
    // we return whatever is the result of calling the same function
    return retryPromise(promiseFactory, nthTry - 1);
  }
}

/**
 * Util function to return a promise which is resolved in provided milliseconds
 */
function waitFor(millSeconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
}

/**
 * Retries a promise with a delay between attempts.
 * @param promiseFactory A function that returns a promise to resolve
 * @param nthTry Number of tries before rejecting
 * @param delayTime Time to wait between retries in milliseconds
 * @returns resolved promise
 */
async function retryPromiseWithDelay<T>(promiseFactory: () => Promise<T>, nthTry: number, delayTime: number): Promise<T> {
  try {
    const res = await promiseFactory();
    return res;
  } catch (e) {
    if (nthTry === 1) {
      return Promise.reject(e);
    }
    console.log('retrying', nthTry, 'time');
    // wait for delayTime amount of time before calling this method again
    await waitFor(delayTime);
    return retryPromiseWithDelay(promiseFactory, nthTry - 1, delayTime);
  }
}

// Example usage:
const examplePromise = () => new Promise<number>((resolve, reject) => {
  const success = Math.random() > 0.5;
  setTimeout(() => success ? resolve(42) : reject(new Error('Failed')), 100);
});

retryPromiseWithDelay(examplePromise, 3, 1000)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));

retryPromise(examplePromise, 3)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
