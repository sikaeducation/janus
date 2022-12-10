import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "Buttons/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  children: "Do it!",
};

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
