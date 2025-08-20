import { Pause, PlayArrow, Replay } from '@mui/icons-material'

import { TimerAction } from '../ui/timer-action'

export function TimerActionsLayoutContent({
  isRunning,
  onPause,
  onReset,
  onStart
}: {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}) {
  return (
    <>
      {!isRunning ? (
        <TimerAction
          startIcon={<PlayArrow />}
          onClick={onStart}>
          Start
        </TimerAction>
      ) : (
        <TimerAction
          startIcon={<Pause />}
          color='warning'
          onClick={onPause}>
          Pause
        </TimerAction>
      )}
      <TimerAction
        color='error'
        startIcon={<Replay />}
        onClick={onReset}>
        Reset
      </TimerAction>
    </>
  )
}
