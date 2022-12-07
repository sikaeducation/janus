import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppContent from ".";

export default {
  title: "Markdown Content",
  component: AppContent,
} as ComponentMeta<typeof AppContent>;

const Template: ComponentStory<typeof AppContent> = (args) => (
  <AppContent {...args} />
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
