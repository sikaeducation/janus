import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorDeferred from ".";

export default {
  title: "Activities/Indicators/IndicatorDeferred",
  component: IndicatorDeferred,
} as ComponentMeta<typeof IndicatorDeferred>;

const Template: ComponentStory<typeof IndicatorDeferred> = () => (
  <IndicatorDeferred />
);

export const Default = Template.bind({});
