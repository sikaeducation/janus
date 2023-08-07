import { ComponentStory, ComponentMeta } from '@storybook/react';

import Heading from '.';

export default {
  title: 'UI/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
  children: 'Primary heading',
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
  children: 'Secondary heading',
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
  children: 'Tertiary heading',
};

export const Level4 = Template.bind({});
Level4.args = {
  level: 4,
  children: 'Quaternary heading',
};
