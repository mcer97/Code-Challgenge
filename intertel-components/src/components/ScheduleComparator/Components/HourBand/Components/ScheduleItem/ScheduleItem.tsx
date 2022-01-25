import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faHome,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { HourBand } from "../../HourBand";
import React from "react";
import { SearchResultType } from "../../../../../SearchField";
import { NullableType } from "../../../../../../helpers";

export interface HourBandProps {
  offset: number;
  globalOffset: number;
  mainTimezoneOffset: number;
  isMain: boolean;
  id: string;
  readableName: string;
  abbreviation: string;
  dateObject: NullableType<Date>;

  /**
   * Callback for when the remove button is triggered.
   */
  onRemove: (id: string) => void;
  onNextClicked: () => void;
  onBeforeClicked: () => void;
  onMakeMainClicked: (id: string) => void;
}

export function ScheduleItem(props: HourBandProps) {
  const regionArray: Array<string> = React.useMemo<Array<string>>(
    () => props.readableName.split("/").reverse(),
    [props.readableName]
  );
  return (
    <div className={styles.scheduleItem}>
      <div className={styles.controlContainer}>
        <div
          className={`${styles.button}  ${styles.removeButton}`}
          onClick={() => props.onRemove(props.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className={`${styles.button}  ${styles.homeToggleButton}`}
          onClick={() => {
            props.onMakeMainClicked(props.id);
          }}
        >
          {props.isMain ? (
            <FontAwesomeIcon icon={faHome} />
          ) : (
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {props.offset - props.mainTimezoneOffset}
            </span>
          )}
        </div>
        <div className={styles.timezoneData}>
          <div className={styles.mainData}>
            <div>{regionArray[0]}</div>
            <div>
              <span style={{ textTransform: "lowercase" }}>
                {props.dateObject &&
                  props.dateObject.toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
              </span>{" "}
              {!isNaN(+props.abbreviation)
                ? `UTC${props.abbreviation}`
                : props.abbreviation}
            </div>
          </div>
          <div className={styles.secondaryData}>
            <div>{regionArray[1]}</div>
            <div>
              {props.dateObject &&
                props.dateObject.toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.button} ${styles.previousDayButton}`}
        onClick={props.onBeforeClicked}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <HourBand offset={props.offset + props.globalOffset} />
      <div
        className={`${styles.button} ${styles.nextDayButton}`}
        onClick={props.onNextClicked}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
}
