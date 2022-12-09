import { ComponentStory, ComponentMeta } from "@storybook/react";

import SecondaryHeading from ".";

export default {
  title: "Headings/Secondary",
  component: SecondaryHeading,
} as ComponentMeta<typeof SecondaryHeading>;

const Template: ComponentStory<typeof SecondaryHeading> = (args) => (
  <SecondaryHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Secondary heading",
};
