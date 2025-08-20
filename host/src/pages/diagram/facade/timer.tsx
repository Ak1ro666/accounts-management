import { formatTime } from '../domain/date'
import { useTimer } from '../model/use-timer'
import { TimeView } from '../ui/time-view'
import { TimerRoot } from '../ui/timer-root'
import { TimerActionsLayoutContent } from './timer-actions-layout-content'

export function Timer() {
  const timer = useTimer()

  return (
    <TimerRoot
      viewTime={
        <TimeView
          timeLeft={timer.timeLeft}
          content={formatTime(timer.timeLeft)}
        />
      }
      actions={
        <TimerActionsLayoutContent
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
        />
      }
      timeLeft={timer.timeLeft}
    />
  )
}
