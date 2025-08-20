import { useEffect, useRef, useState } from 'react'

export function useNow(
  enabled: boolean,
  interval: number,
  onTimeChange: (now: number) => void
) {
  const onTimeChangeRef = useRef(onTimeChange)
  onTimeChangeRef.current = onTimeChange
  const [now, setNow] = useState<number>()

  useEffect(() => {
    if (!enabled) {
      setNow(undefined)
      return
    }

    const intervalId = setInterval(() => {
      setNow(Date.now())
      onTimeChangeRef.current?.(Date.now())
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [enabled, interval])

  return now ?? Date.now()
}

useNow.calculateCountdown = (now: number, startAt: number, timer: number) => {
  return Math.max(timer - (now - startAt), 0)
}

useNow.calculteTimer = (now: number, startAt: number) => {
  return now - startAt
}
