import React from "react";
import styles from "./style.module.scss";
import { AddHours } from "../../../../helpers";
import { HourItem } from "./Components/HourItem";

export interface HourBandProps {
  offset: number;
}

export interface HourBandCategory {
  backgroundColor: string;
  textColor: string;
}

export interface HourBandCategories {
  hours: Array<number>;
  categories: Array<HourBandCategory>;
}

// TODO: Remove them from being hardcoded into a dynamic implementation.
const hardcodedCategories: any = {
  21: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  22: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  23: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  24: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  1: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  2: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  3: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  4: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  5: {
    backgroundColor: "rgb(50, 61, 72)",
    textColor: "rgb(255, 255, 255)",
  },
  6: {
    backgroundColor: "rgb(219, 237, 255)",
    textColor: "",
  },
  7: {
    backgroundColor: "rgb(219, 237, 255)",
    textColor: "",
  },
  8: {
    backgroundColor: "",
    textColor: "",
  },
  9: { backgroundColor: "", textColor: "" },
  10: { backgroundColor: "", textColor: "" },
  11: { backgroundColor: "", textColor: "" },
  12: { backgroundColor: "", textColor: "" },
  13: { backgroundColor: "", textColor: "" },
  14: { backgroundColor: "", textColor: "" },
  15: { backgroundColor: "", textColor: "" },
  16: { backgroundColor: "", textColor: "" },
  17: { backgroundColor: "", textColor: "" },
  18: {
    backgroundColor: "rgb(219, 237, 255)",
    textColor: "",
  },
  19: {
    backgroundColor: "rgb(219, 237, 255)",
    textColor: "",
  },
  20: {
    backgroundColor: "rgb(219, 237, 255)",
    textColor: "",
  },
};

/**
 * Base component for all Field components.
 *
 * For internal usage only!.
 */
export function HourBand(props: HourBandProps): React.ReactElement {
  const date: Date = React.useMemo(() => {
    let date = new Date();
    date = AddHours(date, -date.getHours() + props.offset);

    return date;
  }, [props.offset]);

  return (
    <div className={styles.sliderContainer}>
      {[...Array(21)].map((e, i) => {
        let newDate: Date = new Date(date);
        newDate = AddHours(newDate, i);
        const hour: number = newDate.getHours();
        console.log(hour);
        return (
          <HourItem
            backgroundColor={hardcodedCategories[hour + 1].backgroundColor}
            textColor={hardcodedCategories[hour + 1].textColor}
            dateObject={newDate}
            hourId={i}
            key={i}
          />
        );
      })}
    </div>
  );
}
