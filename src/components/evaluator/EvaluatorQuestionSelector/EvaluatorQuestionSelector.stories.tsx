import { ComponentStory, ComponentMeta } from '@storybook/react';

import EvaluatorQuestionSelector from '.';

export default {
  title: 'Evaluator/EvaluatorQuestionSelector',
  component: EvaluatorQuestionSelector,
} as ComponentMeta<typeof EvaluatorQuestionSelector>;

const Template: ComponentStory<typeof EvaluatorQuestionSelector> = (args) => (
  <EvaluatorQuestionSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedSlug: 'some-slug',
  setSelectedSlug: (slug: string) => console.log(slug),
  slugs: ['some-slug', 'some-other-slug'],
};
