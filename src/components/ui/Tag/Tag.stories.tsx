import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tag from '.';

export default {
  title: 'UI/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello, world!',
};
