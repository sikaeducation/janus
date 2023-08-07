import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleDetail from '.';
import cssSyntaxSample from '../../components/ui/Markdown/css-syntax-sample';

export default {
  title: 'ArticleDetail',
  component: ArticleDetail,
} as ComponentMeta<typeof ArticleDetail>;

const Template: ComponentStory<typeof ArticleDetail> = (args) => <ArticleDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  activity: {
    _type: 'Article',
    title: 'CSS Syntax',
    post_slug: 'css_syntax',
    description: 'Curly braces, tag/class/id selectors, file locations',
    notes: 'Solid',
    content: cssSyntaxSample,
    published: true,
  },
};
