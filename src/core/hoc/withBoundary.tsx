import ErrorBoundary from "../../app/components/ErrorBoundary";

function withBoundary<T extends object>(
  Component: React.ComponentType<T>,
  componentName?: string
): (props: T) => JSX.Element {
  return function (props: T): JSX.Element {
    return <ErrorBoundary component={componentName}>
      <Component {...props} />
    </ErrorBoundary>;
  }
}

export default withBoundary