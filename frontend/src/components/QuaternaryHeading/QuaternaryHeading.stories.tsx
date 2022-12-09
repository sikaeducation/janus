import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./QuaternaryHeading.scss";

import QuaternaryHeading from ".";

export default {
  title: "Headings/Quaternary",
  component: QuaternaryHeading,
} as ComponentMeta<typeof QuaternaryHeading>;

const Template: ComponentStory<typeof QuaternaryHeading> = (args) => (
  <QuaternaryHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Quaternary heading",
};
