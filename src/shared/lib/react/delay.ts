export const delay = (ms: number) => {
  const { promise, resolve } = Promise.withResolvers()

  setTimeout(() => {
    resolve('delay')
  }, ms)

  return promise
}
