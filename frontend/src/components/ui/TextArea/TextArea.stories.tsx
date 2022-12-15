import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextArea from ".";

export default {
  title: "UI/TextArea",
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: "Some content",
  action: (payload: string) => console.log(payload),
  id: "some-id",
  label: "Some label",
  isRequired: true,
};
