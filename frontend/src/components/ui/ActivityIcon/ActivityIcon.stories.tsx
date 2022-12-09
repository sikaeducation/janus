import { ComponentStory, ComponentMeta } from "@storybook/react";

import ActivityIcon from ".";

export default {
  title: "Icons/Activity Icon",
  component: ActivityIcon,
} as ComponentMeta<typeof ActivityIcon>;

const Template: ComponentStory<typeof ActivityIcon> = (args) => (
  <ActivityIcon {...args} />
);

export const Article = Template.bind({});
Article.args = {
  activityType: "Article",
};
