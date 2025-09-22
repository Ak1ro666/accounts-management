import { formatTime } from '../lib/time'
import { useTimer } from '../model/use-timer'
import { TimeView } from '../ui/time-view'
import { TimerActionsLayoutContent } from '../ui/timer-actions-layout-content'
import { TimerRoot } from '../ui/timer-root'

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
