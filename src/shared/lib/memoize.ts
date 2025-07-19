export const memoize = <T extends Record<string, unknown>, R>(
  fn: (arg: T) => R
): ((arg: T) => R) => {
  const cache = new WeakMap<T, R>()

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}
