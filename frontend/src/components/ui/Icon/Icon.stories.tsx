import { ComponentStory, ComponentMeta } from "@storybook/react";

import Icon from ".";

export default {
  title: "Icons/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Checkmark = Template.bind({});
Checkmark.args = {
  type: "checkmark",
};
