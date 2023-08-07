import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import EditableField from '.';
import Heading from '../Heading';

export default {
  title: 'UI/EditableField',
  component: EditableField,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof EditableField>;

const Template: ComponentStory<typeof EditableField> = (args) => {
  const [currentContent, setContent] = useState(args.value ?? '');
  return (
    <EditableField {...args} updateValue={setContent} value={currentContent} />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 'Some content',
  id: 'some-id',
  label: 'Some label',
  isRequired: true,
  className: 'Heading primary-heading',
};
