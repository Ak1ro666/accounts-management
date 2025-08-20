import { useMemo, useState } from 'react'

import { useNow } from '@/shared/lib/react/use-now'

import { calculateTimerState } from '../domain/timer'
import { DEFAULT_TIMER } from '../lib/timer'

export function useTimer() {
  const [startAt, setStartAt] = useState<number>()
  const [timer, setTimer] = useState<number>(DEFAULT_TIMER)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const now = useNow(!!startAt && !isPaused, 10, () => {})

  const { isRunning, timeLeft } = useMemo(
    () =>
      calculateTimerState({
        now,
        startAt,
        timer
      }),
    [now, startAt, timer]
  )

  const handleStart = () => {
    setStartAt(Date.now())
    setIsPaused(false)
  }

  const handlePause = () => {
    setStartAt(undefined)
    setIsPaused(true)
    setTimer(timeLeft)
  }

  const handleReset = () => {
    setStartAt(undefined)
    setTimer(DEFAULT_TIMER)
  }

  return {
    isRunning,
    timeLeft,
    start: handleStart,
    pause: handlePause,
    reset: handleReset
  }
}
