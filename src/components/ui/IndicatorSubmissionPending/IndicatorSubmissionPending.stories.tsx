import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorSubmissionPending from ".";

export default {
  title: "Activities/Indicators/IndicatorSubmissionPending",
  component: IndicatorSubmissionPending,
} as ComponentMeta<typeof IndicatorSubmissionPending>;

const Template: ComponentStory<typeof IndicatorSubmissionPending> = () => (
  <IndicatorSubmissionPending />
);

export const Default = Template.bind({});
