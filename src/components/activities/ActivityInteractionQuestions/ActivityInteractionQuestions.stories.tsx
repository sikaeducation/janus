import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';

import ActivityInteractionQuestions from '.';
import { programContext } from '../../../contexts/program';

export default {
  title: 'Activities/ActivityInteractionQuestions',
  component: ActivityInteractionQuestions,
  decorators: [
    withReactContext({
      Context: programContext,
      initialState: {
        postsBySlug: {
          'some-slug': {
            content: `---
questions:
  - id: 1
    prompt: A prompt
    answer: An answer
  - id: 2
    prompt: Another prompt
    answer: Another answer
---

Answer these questions
            `,
          },
        },
      },
    }),
  ],
} as ComponentMeta<typeof ActivityInteractionQuestions>;

const Template: ComponentStory<typeof ActivityInteractionQuestions> = (
  args,
) => <ActivityInteractionQuestions {...args} />;

export const MultipleQuestions = Template.bind({});
MultipleQuestions.args = {
  userId: 'abcdefg',
  postPerformance: (performance: rawPerformance) => console.log({ performance }),
  postSlug: 'some-slug',
};
