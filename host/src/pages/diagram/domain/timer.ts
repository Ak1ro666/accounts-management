import { useNow } from '@/shared/lib/react/use-now'

export const calculateTimerState = ({
  now,
  startAt,
  timer
}: {
  startAt?: number
  now: number
  timer: number
}) => {
  if (startAt) {
    const timeLeft = useNow.calculateCountdown(now, startAt, timer)
    const isTimeUp = timeLeft === 0

    return {
      isRunning: !isTimeUp,
      timeLeft,
      isTimeUp
    }
  }

  return {
    isRunning: false,
    timeLeft: timer,
    isTimeUp: timer === 0
  }
}
