import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextAreaResponse from ".";

export default {
  title: "Forms/TextAreaResponse",
  component: TextAreaResponse,
} as ComponentMeta<typeof TextAreaResponse>;

const Template: ComponentStory<typeof TextAreaResponse> = (args) => (
  <TextAreaResponse {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: "Some content",
  action: (payload: string) => console.log(payload),
  id: "some-id",
  label: "Some label",
  isRequired: true,
};
