import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Unexpected error' }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p className="error-boundary__title">Something went wrong displaying the results.</p>
          <p className="error-boundary__detail">{this.state.message}</p>
          {this.props.onReset && (
            <button
              className="error-boundary__btn"
              onClick={() => {
                this.setState({ hasError: false, message: null })
                this.props.onReset()
              }}
              type="button"
            >
              Try again
            </button>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
