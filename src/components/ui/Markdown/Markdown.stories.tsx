import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';
import { withRouter } from 'storybook-addon-react-router-v6';
import { programContext } from '../../../contexts/program';
import {
  inline,
  headers,
  lineHeight,
  lists,
  images,
  formatted,
  tables,
} from './sample-content';

import Markdown from '.';
import { performanceContext } from '../../../contexts/performance';
import cssSyntaxSample from './css-syntax-sample';

export default {
  title: 'UI/Markdown',
  component: Markdown,
  decorators: [
    withReactContext({
      Context: programContext,
      initialState: {
        postsBySlug: { 'some-slug': { content: 'Some post' } },
      },
    }),
    withReactContext({
      Context: performanceContext,
      initialState: {
        lastQuestionPerformancesBySlugByLearnerByQuestion: {},
        lastPerformanceBySlugByLearner: {},
      },
    }),
    withRouter,
  ],
} as ComponentMeta<typeof Markdown>;

const Template: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);

export const Headers = Template.bind({});
Headers.args = {
  content: headers,
};

export const LineHeight = Template.bind({});
LineHeight.args = {
  content: lineHeight,
};

export const Inline = Template.bind({});
Inline.args = {
  content: inline,
};

export const Lists = Template.bind({});
Lists.args = {
  content: lists,
};

export const Images = Template.bind({});
Images.args = {
  content: images,
};

export const Tables = Template.bind({});
Tables.args = {
  content: tables,
};

export const Formatted = Template.bind({});
Formatted.args = {
  content: formatted,
};

export const Article = Template.bind({});
Article.args = {
  content: cssSyntaxSample,
};
