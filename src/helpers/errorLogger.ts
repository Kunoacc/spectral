/**
 * This function is used to wrap any async function that may throw an error.
 * @param fn the function to be wrapped
 * @returns 
 */

export async function errorLogger<T>(fn: () => Promise<T>) {
  try {
    return await fn()
  } catch (error) {
    console.error(error)
    // add other global api error logging implementations here.
    // rethrow error to be handled by the caller
    throw error
  }
}