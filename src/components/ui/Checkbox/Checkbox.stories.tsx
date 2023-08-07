import { ComponentStory, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import { useState } from 'react';
import Checkbox from '.';

const { click } = userEvent;

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [value, updateValue] = useState(args.value ?? true);
  return <Checkbox {...args} value={value} updateValue={updateValue} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Some Input',
  id: 'some-id',
  value: true,
};
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const checkbox = await canvas.findByRole('checkbox');
  expect(checkbox).toBeChecked();
  click(checkbox);
  expect(checkbox).not.toBeChecked();
  click(checkbox);
  expect(checkbox).toBeChecked();
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  type: 'secondary',
};
