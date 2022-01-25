import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Field, FieldIntrinsicType } from "./";

export default {
  title: "Intertel Components/Forms/Inputs/Internal/Field",
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Input = Template.bind({});

Input.args = {
  intrinsicType: FieldIntrinsicType.HTMLInputElement,
};

export const Textarea = Template.bind({});

Textarea.args = {
  intrinsicType: FieldIntrinsicType.HTMLTextAreaElement,
};
