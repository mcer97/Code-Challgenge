import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { SearchField, SearchResultType } from "../SearchField";
import { ScheduleItem } from "./Components/HourBand/Components/ScheduleItem";
import { AddHours, NullableType, OptionalType } from "../../helpers";

export interface TimezoneData {
  offsetUTC: number;
  key: string;
  readableName: string;
  abbreviation: string;
  queriedTime?: Date;
}

export interface TimezoneItemRange {
  start: number;
  end: number;
}

export interface TimezoneItemsData {
  timezones: Array<TimezoneData>;
  selection: OptionalType<TimezoneItemRange | number>;
}

export interface ScheduleComparatorProps extends React.AllHTMLAttributes<any> {
  /**
   * Event which handles the request for realtime searching.
   */
  onSearch: (query: string) => Array<SearchResultType>;

  /**
   * Callback for when a result is selected.
   */
  onSelected: (selection: SearchResultType) => void;

  /**
   * Callback for when the remove button is triggered.
   */
  onRemove: (id: string) => void;
  onMakeMainClicked: (id: string) => void;
  /**
   * Container for the states of the current selection of timezones.
   */
  timezones: TimezoneItemsData;
}

export function ScheduleComparator(
  props: ScheduleComparatorProps
): React.ReactElement {
  const [highlighterState, setHighlighterState]: [
    NullableType<number>,
    React.Dispatch<React.SetStateAction<NullableType<number>>>
  ] = React.useState<NullableType<number>>(null);

  const [isDefualt, setIsDefault]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = React.useState<boolean>(false);

  const [currentTimeDates, setCurrentTimeDates]: [
    Array<NullableType<Date>>,
    React.Dispatch<React.SetStateAction<Array<NullableType<Date>>>>
  ] = React.useState<Array<NullableType<Date>>>([]);

  const [currentTime, setCurrentTime]: [
    NullableType<Date>,
    React.Dispatch<React.SetStateAction<NullableType<Date>>>
  ] = React.useState<NullableType<Date>>(new Date());

  const [globalOffset, setGlobalOffset]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = React.useState<number>(0);

  const [mainTimezoneOffset, setMainTimezoneOffset]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = React.useState<number>(0);

  const highlighterRef: React.MutableRefObject<NullableType<HTMLDivElement>> =
    React.useRef<NullableType<HTMLDivElement>>(null);

  const highlighterOutlineRef: React.MutableRefObject<
    NullableType<HTMLDivElement>
  > = React.useRef<NullableType<HTMLDivElement>>(null);

  const highlighterContainerRef: React.MutableRefObject<
    NullableType<HTMLDivElement>
  > = React.useRef<NullableType<HTMLDivElement>>(null);

  const onHighlighterContainerClick = (event: any) => {
    onCapture(event);
  };

  React.useEffect(() => {
    if (
      isDefualt &&
      props.timezones.timezones.length >= 0 &&
      highlighterState === null
    ) {
      const mainTimezone = props.timezones.timezones[0];

      if (mainTimezone && mainTimezone.queriedTime !== undefined) {
        let newTime = new Date(
          mainTimezone.queriedTime.toLocaleString("en-US", {
            timeZone: mainTimezone.key,
          })
        );
        // TODO: Figure out what went wrong here, possibly a bad design decision where I did not take into account
        //  using a default setting.
        SelectHour(newTime.getHours());
      }
    }
  });
  React.useEffect(() => {
    let currentDate = new Date();
    const mainTimezone = props.timezones.timezones[0];

    if (mainTimezone && highlighterState !== null) {
      currentDate = new Date(
        currentDate.toLocaleString("en-US", { timeZone: mainTimezone.key })
      );
      currentDate.setHours(mainTimezone.offsetUTC, 0, 0, 0);
      setCurrentTime(currentDate);
    }
    UpdateCurrentTimeDates();
  }, [highlighterState]);

  const onCapture = (event: any) => {
    event.stopPropagation();

    const highlighterOutlineElement = highlighterOutlineRef.current;
    const currentTargetRect = event.currentTarget.getBoundingClientRect();
    const event_offsetX: number = event.clientX - currentTargetRect.left,
      event_width = currentTargetRect.width;
    const hourWidth: number = event_width / 21;
    const normalizedOffset = Math.floor(event_offsetX / hourWidth);
    if (highlighterOutlineElement)
      highlighterOutlineElement.style.left = `${Math.min(
        Math.max(normalizedOffset * hourWidth, 0),
        event_width - hourWidth
      )}px`;
  };

  const SelectHour = (index: number) => {
    const highlighterElement = highlighterRef.current;
    const highlighterOutlineElement = highlighterOutlineRef.current;
    const highlighterContainerElement = highlighterContainerRef.current;
    if (
      highlighterElement &&
      highlighterOutlineElement &&
      highlighterContainerElement
    ) {
      const currentTargetRect =
        highlighterContainerElement.getBoundingClientRect();
      const event_width: number = currentTargetRect.width;
      const hourWidth: number = event_width / 21;
      const normalizedOffset = index;
      highlighterElement.style.left = `${Math.min(
        Math.max(normalizedOffset * hourWidth, 0),
        event_width - hourWidth
      )}px`;
      setHighlighterState(normalizedOffset);
    }
  };

  const onCaptureStop = (event: any) => {
    event.stopPropagation();

    const highlighterElement = highlighterRef.current;
    const currentTargetRect = event.currentTarget.getBoundingClientRect();
    const event_offsetX: number = event.clientX - currentTargetRect.left,
      event_width = currentTargetRect.width;
    const hourWidth: number = event_width / 21;
    const normalizedOffset = Math.floor(event_offsetX / hourWidth);
    if (highlighterElement && event.buttons === 1) {
      highlighterElement.style.left = `${Math.min(
        Math.max(normalizedOffset * hourWidth, 0),
        event_width - hourWidth
      )}px`;
    }
    if (highlighterState !== normalizedOffset) {
      SelectHour(normalizedOffset);
      UpdateCurrentTimeDates();
    }
  };

  const onMakeMainClicked = (id: string) => {
    props.onMakeMainClicked(id);
  };

  const UpdateCurrentTimeDates = () => {
    if (!currentTime) return;
    setCurrentTimeDates(
      props.timezones.timezones.map((timezone) => {
        if (highlighterState === null) return null;
        let newTime = new Date(
          currentTime.toLocaleString("en-US", { timeZone: timezone.key })
        );
        newTime.setHours(
          highlighterState + timezone.offsetUTC + globalOffset,
          0,
          0,
          0
        );
        return newTime;
      })
    );
  };

  React.useEffect(() => {
    if (props.timezones.timezones.length >= 1) {
      setMainTimezoneOffset(props.timezones.timezones[0].offsetUTC);
    }
    UpdateCurrentTimeDates();
  }, [props.timezones.timezones]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchSection}>
          <SearchField
            placeholder={"Find a place or timezone - Press Enter"}
            onSearch={props.onSearch}
            onSelected={props.onSelected}
            rounded={true}
          />
        </div>
      </div>
      <div className={styles.scheduleItemsSection}>
        {props.timezones.timezones.map((timezoneData, i) => {
          return (
            <ScheduleItem
              onRemove={props.onRemove}
              key={timezoneData.key}
              dateObject={currentTimeDates[i]}
              onMakeMainClicked={onMakeMainClicked}
              id={timezoneData.key}
              isMain={i === 0}
              mainTimezoneOffset={mainTimezoneOffset}
              offset={timezoneData.offsetUTC}
              globalOffset={globalOffset}
              readableName={timezoneData.readableName}
              abbreviation={timezoneData.abbreviation}
              onNextClicked={() => {
                setHighlighterState(null);
                setGlobalOffset(globalOffset + 21);
              }}
              onBeforeClicked={() => {
                setHighlighterState(null);
                setGlobalOffset(globalOffset - 21);
              }}
            />
          );
        })}
        <div
          ref={highlighterContainerRef}
          className={styles.highlighterScreen}
          // Note: translate3d is being used here to force hardware acceleration so that we get a smoother and more responsible highlighter.
          style={{ transform: "translate3d(0,0,1px)" }}
          onMouseDown={onHighlighterContainerClick}
          onMouseMove={onCapture}
          onClick={onCaptureStop}
        >
          {props.timezones.timezones.length !== 0 && (
            <div
              className={styles.highlighter}
              ref={highlighterRef}
              // Note: translate3d is being used here to force hardware acceleration so that we get a smoother and more responsible highlighter.
              style={{
                opacity: highlighterState !== null ? 1.0 : 0.0,
                transform: "translate3d(0,0,1px)",
              }}
            />
          )}
          {props.timezones.timezones.length !== 0 && (
            <div
              className={styles.highlighterOutline}
              ref={highlighterOutlineRef}
              // Note: translate3d is being used here to force hardware acceleration so that we get a smoother and more responsible highlighter.
              style={{
                transform: "translate3d(0,0,1px)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
