import { ComponentStory, ComponentMeta } from "@storybook/react";

import LearnerPrompt from ".";

export default {
  title: "Forms/LearnerPrompt",
  component: LearnerPrompt,
} as ComponentMeta<typeof LearnerPrompt>;

const Template: ComponentStory<typeof LearnerPrompt> = (args) => (
  <LearnerPrompt {...args} />
);

export const Default = Template.bind({});
Default.args = {
  performance: {
    id: 1,
    type: "prompt",
    userId: "abcdefg",
    postSlug: "some-slug",
    payload: {
      response: "Some response",
      prompt: "Some prompt",
    },
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
};
