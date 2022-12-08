import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorSubmissionAccepted from ".";

export default {
  title: "Icons/IndicatorSubmissionAccepted",
  component: IndicatorSubmissionAccepted,
} as ComponentMeta<typeof IndicatorSubmissionAccepted>;

const Template: ComponentStory<typeof IndicatorSubmissionAccepted> = () => (
  <IndicatorSubmissionAccepted />
);

export const Default = Template.bind({});
