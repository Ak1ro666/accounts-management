export class Atom<T> {
  private value: T
  private listeners: Set<() => void> = new Set()

  constructor(value: T) {
    this.value = value
  }

  listen = (callback: () => void) => {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  set = (value: T) => {
    this.value = value
    this.listeners.forEach(listener => listener())
  }

  get = () => {
    return this.value
  }
}
