/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'

type DependencyList<T extends unknown = unknown> = ReadonlyArray<T>

export function useMyMemo<T extends unknown>(
  callback: () => T,
  deps: DependencyList
): T {
  const prevResult = useRef<T | null>(null)
  const prevDeps = useRef<DependencyList | null>(null)

  if (
    prevResult.current !== null &&
    prevDeps.current !== null &&
    areDepsEqual(deps, prevDeps.current)
  ) {
    return prevResult.current
  }

  const result = callback()
  prevResult.current = result
  prevDeps.current = deps

  return result
}

export function useMyCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T {
  return useMyMemo(() => callback, deps)
}

const areDepsEqual = <
  DepsA extends DependencyList = [],
  DepsB extends DependencyList = []
>(
  depsA: DepsA,
  depsB: DepsB
): boolean => {
  if (depsA.length !== depsB.length) return false

  for (let i = 0; i < depsA.length; i++) {
    if (!Object.is(depsA[i], depsB[i])) {
      return false
    }
  }

  return true
}

// export function useMyMemo() {}
// export function useMyCallback() {}
