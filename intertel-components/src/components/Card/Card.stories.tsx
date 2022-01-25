import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card } from "./";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Intertel Components/Containers/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
export const CenteredVertically = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CenteredVertically.args = {
  width: 500,
  height: 250,
  justifyContent: "stretch",
  alignItems: "center",
  children: (
    <div
      style={{
        backgroundColor: "gray",
        flexGrow: 1,
        width: "50%",
        height: "50%",
      }}
    />
  ),
};
