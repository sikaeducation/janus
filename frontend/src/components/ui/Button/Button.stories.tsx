import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  type: "primary",
  children: "Do it!",
};
PrimarySmall.storyName = "Primary - Small";

export const PrimarySmallFailure = Template.bind({});
PrimarySmallFailure.args = {
  type: "primary",
  children: "Do it!",
  actionType: "failure",
};
PrimarySmallFailure.storyName = "Primary - Failure - Small";

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  type: "primary",
  size: "large",
  children: "Do it!",
};
PrimaryLarge.storyName = "Primary - Large";

export const PrimaryLargeFailure = Template.bind({});
PrimaryLargeFailure.args = {
  type: "primary",
  size: "large",
  children: "Do it!",
  actionType: "failure",
};
PrimaryLargeFailure.storyName = "Primary - Failure - Large";

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  children: "Maybe do it?",
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: "ghost",
  children: "Could do it",
};
