import { startTransition, useDeferredValue, useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(
      () => startTransition(() => setDebounceValue(value)),
      delay
    )

    return () => {
      clearTimeout(timer)
    }
  }, [delay, value])

  const defferedValue = useDeferredValue(debounceValue)

  return defferedValue
}
