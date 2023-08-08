import { ComponentStory, ComponentMeta } from "@storybook/react";

import ActivityInteractionSubmission from ".";

export default {
  title: "Activities/ActivityInteractionSubmission",
  component: ActivityInteractionSubmission,
} as ComponentMeta<typeof ActivityInteractionSubmission>;

const Template: ComponentStory<typeof ActivityInteractionSubmission> = (
  args,
) => <ActivityInteractionSubmission {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  postPerformance: (performance: rawSubmissionPerformance) =>
    console.log(performance),
  userId: "abcdefg",
  postSlug: "some-slug",
  performances: [],
};
