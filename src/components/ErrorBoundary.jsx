import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-[#FAF8F2] flex flex-col items-center justify-center p-8 text-center select-none font-sans">
          <div className="max-w-md p-8 bg-white rounded-2xl border border-red-200 shadow-xl space-y-4">
            <h2 className="font-bebas text-4xl text-slate-900 tracking-wide">
              APPLICATION RECOVERED
            </h2>
            <p className="text-sm text-slate-600">
              A temporary display error was caught and prevented.
            </p>
            <div className="p-3 bg-red-50 text-red-700 text-xs font-mono rounded text-left overflow-auto max-h-32">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-slate-950 hover:bg-[#FF2A5F] text-white text-sm font-bold rounded-full transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
