import { ComponentStory, ComponentMeta } from "@storybook/react";

import Markdown from ".";

export default {
  title: "Content/AppContent",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

const Template: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  content: "# Some Header\n\nSome content",
  className: "some-class",
};
OnlyContent.storyName = "Basic Configuration";

export const Contained = Template.bind({});
Contained.args = {
  content: "# Some Header\n\nSome content",
  isContained: true,
};
OnlyContent.storyName = "Contained";
