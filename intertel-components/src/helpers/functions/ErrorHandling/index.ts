enum ErrorTypes {
  ERROR,
  RANGE_ERROR,
  EVAL_ERROR,
  REFERENCE_ERROR,
  SYNTAX_ERROR,
  TYPE_ERROR,
  URI_ERROR,
  AGGREGATE_ERROR,
}

const ThrowComponentError = (
  componentName: string,
  errorMessage: string,
  errorType: ErrorTypes = ErrorTypes.ERROR
) => {
  const finalErrorMessage: string = `Intertel Components [${componentName}]: ${errorMessage}`;
  switch (errorType) {
    case ErrorTypes.RANGE_ERROR:
      throw new RangeError(finalErrorMessage);
    case ErrorTypes.EVAL_ERROR:
      throw new EvalError(finalErrorMessage);
    case ErrorTypes.REFERENCE_ERROR:
      throw new ReferenceError(finalErrorMessage);
    case ErrorTypes.SYNTAX_ERROR:
      throw new SyntaxError(finalErrorMessage);
    case ErrorTypes.TYPE_ERROR:
      throw new TypeError(finalErrorMessage);
    case ErrorTypes.URI_ERROR:
      throw new URIError(finalErrorMessage);
    case ErrorTypes.AGGREGATE_ERROR:
      throw new AggregateError(finalErrorMessage);
    case ErrorTypes.ERROR:
    default:
      throw new Error(finalErrorMessage);
  }
};

export { ThrowComponentError, ErrorTypes };
