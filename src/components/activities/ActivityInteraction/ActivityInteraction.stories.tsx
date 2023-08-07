import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActivityInteraction from '.';

export default {
  title: 'Activities/ActivityInteraction',
  component: ActivityInteraction,
} as ComponentMeta<typeof ActivityInteraction>;

const Template: ComponentStory<typeof ActivityInteraction> = (args) => (
  <ActivityInteraction {...args} />
);

export const Exercise = Template.bind({});
Exercise.args = {
  postType: 'exercise',
  userId: 'abcdefg',
  postSlug: 'css-intro',
};
