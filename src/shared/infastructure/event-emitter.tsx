import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener<T = any> = (data: T) => void;

export class EventEmitter<T extends Record<string, unknown>> {
  private events: Map<keyof T, Set<Listener>> = new Map();

  on<K extends keyof T>(event: K, callback: Listener<T[K]>) {
    const eventListenerSet = this.events.get(event);

    if (!eventListenerSet) {
      this.events.set(event, new Set([callback]));
    } else {
      eventListenerSet.add(callback);
    }
  }

  bindEmit<K extends keyof T>(event: K) {
    return (data: T[K]) => {
      this.emit(event, data);
    };
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const eventsListenersSet = this.events.get(event);

    if (eventsListenersSet) {
      eventsListenersSet.forEach((listener) => listener(data));
    }
  }

  off<K extends keyof T>(event: K, callback: Listener<T[K]>) {
    const eventsListenersSet = this.events.get(event);

    if (eventsListenersSet) {
      eventsListenersSet.delete(callback);
    }
  }

  useEvent = <K extends keyof T>(event: K, callback: Listener<T[K]>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      this.on(event, callback);

      return () => {
        this.off(event, callback);
      };
    }, [callback, event]);
  };
}
