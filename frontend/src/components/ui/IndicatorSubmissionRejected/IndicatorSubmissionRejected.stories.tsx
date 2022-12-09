import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorSubmissionRejected from ".";

export default {
  title: "Icons/IndicatorSubmissionRejected",
  component: IndicatorSubmissionRejected,
} as ComponentMeta<typeof IndicatorSubmissionRejected>;

const Template: ComponentStory<typeof IndicatorSubmissionRejected> = () => (
  <IndicatorSubmissionRejected />
);

export const Default = Template.bind({});
