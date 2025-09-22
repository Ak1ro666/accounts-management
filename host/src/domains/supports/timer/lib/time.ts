export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const millis = milliseconds % 1000
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`
}

export const DEFAULT_TIMER = 1000 * 10
