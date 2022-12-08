import { ComponentStory, ComponentMeta } from "@storybook/react";

import IndicatorViewUnclear from ".";

export default {
  title: "Icons/IndicatorViewUnclear",
  component: IndicatorViewUnclear,
} as ComponentMeta<typeof IndicatorViewUnclear>;

const Template: ComponentStory<typeof IndicatorViewUnclear> = () => (
  <IndicatorViewUnclear />
);

export const Default = Template.bind({});
