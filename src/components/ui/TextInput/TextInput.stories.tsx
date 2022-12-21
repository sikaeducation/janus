import { ComponentStory, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { useState } from "react";
import TextInput from ".";

export default {
  title: "UI/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => {
  const [value, updateValue] = useState(args.value ?? "");
  return <TextInput {...args} value={value} updateValue={updateValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Some Input",
  id: "some-id",
  value: "Some value",
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const elements = await canvas.queryByRole("listitem");

  expect(elements).not.toBeInTheDocument();
};
