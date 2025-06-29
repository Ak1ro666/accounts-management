import type { ErrorInfo, ReactNode } from 'react'

import { Component } from 'react'

import { ErrorComponent } from './error-component'

type ErrorBoundaryState = {
  hasError: boolean
}

type ErrorBoundaryProps = {
  children?: ReactNode
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(/* error: Error */) {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return <ErrorComponent />
    }
    return this.props.children
  }
}
