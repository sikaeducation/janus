import { ComponentStory, ComponentMeta } from "@storybook/react";

import PrimaryHeading from ".";

export default {
  title: "Headings/Primary",
  component: PrimaryHeading,
} as ComponentMeta<typeof PrimaryHeading>;

const Template: ComponentStory<typeof PrimaryHeading> = (args) => (
  <PrimaryHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Primary heading",
};
