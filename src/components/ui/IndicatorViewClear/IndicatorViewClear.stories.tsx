import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorViewClear from ".";

export default {
  title: "Activities/Indicators/IndicatorViewClear",
  component: IndicatorViewClear,
} as ComponentMeta<typeof IndicatorViewClear>;

const Template: ComponentStory<typeof IndicatorViewClear> = () => (
  <IndicatorViewClear />
);

export const Default = Template.bind({});
