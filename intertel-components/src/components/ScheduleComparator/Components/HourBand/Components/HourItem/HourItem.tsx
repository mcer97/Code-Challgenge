import React from "react";
import styles from "./style.module.scss";
import { AddHours } from "../../../../../../helpers";

export interface HourItemProps extends React.AllHTMLAttributes<any> {
  dateObject: Date;
  hourId: number;
  textColor: string;
  backgroundColor: string;
}

/**
 * Base component for all Field components.
 *
 * For internal usage only!.
 */
export function HourItem(props: HourItemProps): React.ReactElement {
  const hour: number = React.useMemo(() => {
    return props.dateObject.getHours();
  }, [props.dateObject]);

  switch (props.dateObject.getHours()) {
    case 0:
      return (
        <div className={styles.hourContainer}>
          <div
            className={`${styles.internalContainer}  ${styles.hourContainerDayStart}`}
            style={{
              color: props.textColor,
              backgroundColor: props.backgroundColor,
            }}
          >
            <div className={styles.hourNumber}>
              {props.dateObject.toLocaleString("en-US", { month: "short" })}
            </div>
            <div className={styles.meridien}>{props.dateObject.getDate()}</div>
          </div>
        </div>
      );
    case 23:
      return (
        <div className={styles.hourContainer}>
          <div
            className={`${styles.internalContainer}  ${styles.hourContainerDayEnd}`}
            style={{
              color: props.textColor,
              backgroundColor: props.backgroundColor,
            }}
          >
            <div className={styles.hourNumber}>
              {hour <= 12 ? hour : hour - 12}
            </div>
            <div className={styles.meridien}>{hour < 12 ? "am" : "pm"}</div>
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.hourContainer}>
          <div
            className={styles.internalContainer}
            style={{
              color: props.textColor,
              backgroundColor: props.backgroundColor,
            }}
          >
            <div className={styles.hourNumber}>
              {hour <= 12 ? hour : hour - 12}
            </div>
            <div className={styles.meridien}>{hour < 12 ? "am" : "pm"}</div>
          </div>
        </div>
      );
  }
}
