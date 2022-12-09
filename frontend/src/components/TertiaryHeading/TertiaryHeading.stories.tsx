import { ComponentStory, ComponentMeta } from "@storybook/react";

import TertiaryHeading from ".";

export default {
  title: "Headings/Tertiary",
  component: TertiaryHeading,
} as ComponentMeta<typeof TertiaryHeading>;

const Template: ComponentStory<typeof TertiaryHeading> = (args) => (
  <TertiaryHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Tertiary heading",
};
