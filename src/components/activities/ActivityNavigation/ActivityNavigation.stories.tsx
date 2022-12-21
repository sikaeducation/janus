import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import ActivityNavigation from ".";

export default {
  title: "Activities/ActivityNavigation",
  component: ActivityNavigation,
  decorators: [withRouter],
} as ComponentMeta<typeof ActivityNavigation>;

const Template: ComponentStory<typeof ActivityNavigation> = (args) => (
  <ActivityNavigation {...args} />
);

export const Link = Template.bind({});
Link.args = {
  nextLabel: "Next Article",
  nextSlug: "next",
};
