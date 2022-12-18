import { ComponentStory, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import Form from ".";

export default {
  title: "UI/Form",
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const NoInputs = Template.bind({});
NoInputs.args = {
  label: "",
};
NoInputs.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const elements = await canvas.queryByRole("listitem");

  expect(elements).not.toBeInTheDocument();
};
