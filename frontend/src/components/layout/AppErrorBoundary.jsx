import React from "react";

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: ""
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unexpected frontend error"
    };
  }

  componentDidCatch(error) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-rose-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600">
              Frontend Error
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              The dashboard crashed while rendering.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {this.state.message}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
