import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchField, SearchResultType } from "./";

export default {
  title: "Intertel Components/Forms/Inputs/SearchField",
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => (
  <SearchField {...args} />
);

export const Mockup = Template.bind({});
/*

const filteredData = data.filter((value) =>
      value.includes(event.target.value)
  );
 */
Mockup.args = {
  onSelected: (selection: SearchResultType) => {
    console.log(selection);
  },
  onSearch: (query) => {
    const data = ["aaa", "bbb", "aaab", "bbbaaa"];

    const filteredData: Array<SearchResultType> = data
      .filter((value) => value.includes(query))
      .map((value) => {
        const result: SearchResultType = {
          key: value,
          value: value,
        };
        return result;
      });

    return filteredData;
  },
};
