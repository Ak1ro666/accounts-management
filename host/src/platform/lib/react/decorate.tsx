/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ReactElement, Suspense } from 'react'

import { UiLoader } from '@/platform/ui/loader'

type WithUse<T extends (...args: any) => any> = T & {
  use: <R extends (...args: any) => any>(
    decorator: (component: T) => R
  ) => WithUse<R>
}

export function withDecorators<T extends (props: unknown) => any>(
  Component: T
) {
  const DecoratedComponent: WithUse<T> = Component as any

  DecoratedComponent.use = function <R extends (props: unknown) => any>(
    decorator: (component: T) => R
  ) {
    return withDecorators(decorator(this))
  }

  return DecoratedComponent
}

export const withSkeleton =
  (skeleton: ReactElement) =>
    <T extends (props: unknown) => any>(Component: T) => {
      return function WithSkeleton(props: ComponentProps<T>) {
        return (
          <Suspense fallback={skeleton}>
            <Component {...(props as any)} />
          </Suspense>
        )
      }
    }

export function withFallbacks<
  P extends {
    ref?: React.Ref<HTMLElement>
    className?: string
  }
>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function EnhancedComponent(props: P) {
    return (
      <Suspense fallback={<UiLoader />}>
        <Component {...props} />
      </Suspense>
    )
  }
}
