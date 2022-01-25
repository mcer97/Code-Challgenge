import React from "react";
import { Field, FieldIntrinsicType } from "../Field";
import styles from "./style.module.scss";

export interface TextFieldProps extends React.AllHTMLAttributes<any> {
  /**
   * React reference for the internal field
   */
  intrinsicRef?: React.MutableRefObject<HTMLInputElement>;
  /**
   * Sets the container to be rounded if true.
   */
  rounded?: boolean;

  extraClassNames?: Array<string>;
}

/**
 * Base component for all Field components.
 *
 * For internal usage only!.
 */
export function TextField(props: TextFieldProps): React.ReactElement {
  const { rounded, extraClassNames, ...remainingProps } = props;

  const [classNames, setClassNames]: [
    Array<string>,
    React.Dispatch<React.SetStateAction<Array<string>>>
  ] = React.useState<Array<string>>([styles.textField]);

  React.useEffect(() => {
    const classNamesTemp: Array<string> = [styles.textField];
    if (props.rounded) classNamesTemp.push(styles.rounded);

    setClassNames(
      extraClassNames !== undefined
        ? classNamesTemp.concat(extraClassNames)
        : classNamesTemp
    );
  }, [props.rounded, extraClassNames]);

  return (
    <Field
      {...remainingProps}
      extraClassNames={classNames}
      intrinsicType={FieldIntrinsicType.HTMLInputElement}
    />
  );
}
