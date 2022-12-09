import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorSubmissionPending from ".";

export default {
  title: "Icons/IndicatorSubmissionPending",
  component: IndicatorSubmissionPending,
} as ComponentMeta<typeof IndicatorSubmissionPending>;

const Template: ComponentStory<typeof IndicatorSubmissionPending> = () => (
  <IndicatorSubmissionPending />
);

export const Default = Template.bind({});
