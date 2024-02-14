import React, { Component, ErrorInfo } from 'react';
import ErrorMessage from '../components/ui/ErrorPopup';

type ErrorProps = {
  children: React.ReactNode;
};

type ErrorState = {
  hasError: boolean;
  message: string;
};
class ErrorBoundry extends Component<ErrorProps, ErrorState> {
  state = {
    hasError: false,
    message: '',
  };

  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          error={this.state.hasError}
          message={this.state.message}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
