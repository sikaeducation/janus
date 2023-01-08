import { ComponentStory, ComponentMeta } from "@storybook/react";

import Icon from ".";

export default {
  title: "UI/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Checkmark = Template.bind({});
Checkmark.args = {
  type: "checkmark",
};

export const Article = Template.bind({});
Article.args = {
  type: "article",
};

export const Close = Template.bind({});
Close.args = {
  type: "close",
};
