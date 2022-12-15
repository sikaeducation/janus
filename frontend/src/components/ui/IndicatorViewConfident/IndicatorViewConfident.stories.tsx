import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorViewConfident from ".";

export default {
  title: "Activities/Indicators/IndicatorViewConfident",
  component: IndicatorViewConfident,
} as ComponentMeta<typeof IndicatorViewConfident>;

const Template: ComponentStory<typeof IndicatorViewConfident> = () => (
  <IndicatorViewConfident />
);

export const Default = Template.bind({});
