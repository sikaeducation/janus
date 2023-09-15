import { ComponentStory, ComponentMeta } from "@storybook/react";

import ActivityInteractionView from ".";

export default {
	title: "Activities/ActivityInteractionView",
	component: ActivityInteractionView,
} as ComponentMeta<typeof ActivityInteractionView>;

const Template: ComponentStory<typeof ActivityInteractionView> = (args) => (
  <ActivityInteractionView {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
	postPerformance: (performance: rawPerformance) => console.log(performance),
	userId: "abcdefg",
	postSlug: "some-slug",
	performances: [],
};
