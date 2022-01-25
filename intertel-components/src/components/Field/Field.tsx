import React from "react";
import { ErrorTypes, NullableType, ThrowComponentError } from "../../helpers";
import styles from "./style.module.scss";

export enum FieldIntrinsicType {
  HTMLInputElement,
  HTMLTextAreaElement,
}

export interface FieldProps extends React.AllHTMLAttributes<any> {
  /**
   * The type of the intrinsic element for the field component.
   */
  intrinsicType: FieldIntrinsicType;
  /**
   * React reference for the internal field
   */
  intrinsicRef?: React.MutableRefObject<
    NullableType<HTMLInputElement | HTMLTextAreaElement>
  >;

  extraClassNames?: Array<string>;
}

/**
 * Base component for all Field components.
 *
 * For internal usage only!.
 */
export function Field(props: FieldProps): React.ReactElement {
  const { intrinsicType, intrinsicRef, extraClassNames, ...remainingProps } =
    props;

  const classNames = React.useMemo<string>(
    () => (extraClassNames ? " " + extraClassNames?.join(" ") : ""),
    [extraClassNames]
  );

  switch (intrinsicType) {
    case FieldIntrinsicType.HTMLInputElement:
      return (
        <input
          ref={intrinsicRef as React.MutableRefObject<HTMLInputElement>}
          className={styles.removeDefaultStyles + classNames}
          {...remainingProps}
        />
      );
    case FieldIntrinsicType.HTMLTextAreaElement:
      return (
        <textarea
          ref={intrinsicRef as React.MutableRefObject<HTMLTextAreaElement>}
          className={styles.removeDefaultStyles + classNames}
          {...remainingProps}
        />
      );
    default:
      ThrowComponentError(
        "Field",
        "Property 'intrinsicType' has to be of type 'FieldIntrinsicType'",
        ErrorTypes.ERROR
      );
  }
  return <></>;
}
