import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonFormSubmission from ".";

export default {
  title: "Buttons/ButtonFormSubmission",
  component: ButtonFormSubmission,
} as ComponentMeta<typeof ButtonFormSubmission>;

const Template: ComponentStory<typeof ButtonFormSubmission> = (args) => (
  <ButtonFormSubmission {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  label: "Some Label",
};
