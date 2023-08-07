import { ComponentStory, ComponentMeta } from '@storybook/react';
import { jest, expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import Button from '.';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Action = Template.bind({});
const action = jest.fn();
Action.args = {
  type: 'primary',
  children: 'Do it!',
  action,
};
Action.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(action).not.toHaveBeenCalled();

  const button = await canvas.findByRole('button');
  userEvent.click(button);

  expect(action).toHaveBeenCalled();
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  type: 'primary',
  children: 'Do it!',
  action,
};
PrimarySmall.storyName = 'Primary - Small';

export const PrimarySmallFailure = Template.bind({});
PrimarySmallFailure.args = {
  type: 'primary',
  children: 'Do it!',
  actionType: 'failure',
};
PrimarySmallFailure.storyName = 'Primary - Failure - Small';

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  type: 'primary',
  size: 'large',
  children: 'Do it!',
};
PrimaryLarge.storyName = 'Primary - Large';

export const PrimaryLargeFailure = Template.bind({});
PrimaryLargeFailure.args = {
  type: 'primary',
  size: 'large',
  children: 'Do it!',
  actionType: 'failure',
};
PrimaryLargeFailure.storyName = 'Primary - Failure - Large';

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'Maybe do it?',
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: 'ghost',
  children: 'Could do it',
};
