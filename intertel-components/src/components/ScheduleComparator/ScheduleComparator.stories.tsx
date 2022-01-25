import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ScheduleComparator, TimezoneData, TimezoneItemsData } from "./";
import { Card } from "../Card";
import { SearchResultType } from "../SearchField";
import axios from "axios";

export default {
  title: "Intertel Components/Forms/Inputs/ScheduleComparator",
  component: ScheduleComparator,
} as ComponentMeta<typeof ScheduleComparator>;

const Template: ComponentStory<typeof ScheduleComparator> = (args) => {
  const [timezones, setTimezones] = React.useState<Array<string>>([]);
  const data1 = async () => {
    try {
      const resp = await axios.get("http://worldtimeapi.org/api/timezone");
      setTimezones(resp.data);
    } catch (e) {}
  };

  React.useEffect(() => {
    data1();
  }, []);

  const [selectedTimezones, setSelectedTimezones]: [
    TimezoneData[],
    React.Dispatch<React.SetStateAction<TimezoneData[]>>
  ] = React.useState<Array<TimezoneData>>([]);

  const timezoneData: TimezoneItemsData = {
    selection: 1,
    timezones: selectedTimezones,
  };

  const onMakeMainClicked = (id: string) => {
    setSelectedTimezones([
      ...selectedTimezones.sort(function (x, y) {
        return x.key === id ? -1 : y.key === id ? 1 : 0;
      }),
    ]);
  };

  return (
    <Card width={"945px"} height={"auto"}>
      <ScheduleComparator
        {...args}
        timezones={timezoneData}
        onRemove={(id: string) => {
          setSelectedTimezones(
            selectedTimezones.filter((value) => value.key !== id)
          );
        }}
        onMakeMainClicked={onMakeMainClicked}
        onSelected={async (selection: SearchResultType) => {
          if (
            selectedTimezones.find((value) => value.key === selection.key) ===
            undefined
          )
            try {
              const resp = await axios.get(
                `http://worldtimeapi.org/api/timezone/${selection.key}`
              );

              setSelectedTimezones([
                ...selectedTimezones,
                {
                  offsetUTC: +resp.data.utc_offset.split(":")[0],
                  key: selection.key,
                  readableName: selection.value,
                  abbreviation: resp.data.abbreviation,
                  queriedTime:
                    selectedTimezones.length === 0
                      ? new Date(resp.data.datetime)
                      : undefined,
                },
              ]);
            } catch (e) {}
        }}
        onSearch={(query) => {
          const filteredData: Array<SearchResultType> = timezones
            .filter((value) =>
              value
                .toLowerCase()
                .replaceAll("_", " ")
                .includes(query.toLowerCase())
            )
            .map((value) => {
              const result: SearchResultType = {
                key: value,
                value: value.replaceAll("_", " "),
              };
              return result;
            });

          return filteredData;
        }}
      />
    </Card>
  );
};

export const Mockup = Template.bind({});
/*

const filteredData = data.filter((value) =>
      value.includes(event.target.value)
  );
 */
Mockup.args = {};
