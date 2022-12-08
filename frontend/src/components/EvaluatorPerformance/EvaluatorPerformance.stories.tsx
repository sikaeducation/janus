import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import EvaluatorPerformance from ".";

export default {
  title: "Forms/EvaluatorPerformance",
  component: EvaluatorPerformance,
  decorators: [withRouter],
} as ComponentMeta<typeof EvaluatorPerformance>;

const Template: ComponentStory<typeof EvaluatorPerformance> = (args) => (
  <EvaluatorPerformance {...args} />
);

export const Default = Template.bind({});
Default.args = {
  path: ",",
  performance: {
    id: 1,
    type: "question",
    userId: "user@email.com",
    postSlug: "some-slug",
    payload: {
      prompt: "Some prompt",
      response: "Some response",
      originalPostSlug: "some-other-slug",
      answer: "Some answer",
    },
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  feedback: "Some feedback",
  updateFeedback:
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      console.log({ learnerId, event }),
  status: "Some status",
  updateStatus:
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      console.log({ learnerId, event }),
};
