import { ComponentStory, ComponentMeta } from '@storybook/react';

import Drawer from '.';
import Heading from '../Heading';

export default {
  title: 'UI/Drawer',
  component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <article>
      <Heading level={2}>Some important thing</Heading>
      <p>Some detail about it</p>
    </article>
  ),
  close: () => {},
};

export const Modal = Template.bind({});
Modal.args = {
  children: (
    <article>
      <Heading level={2}>Some important thing</Heading>
      <p>Some detail about it</p>
    </article>
  ),
  modal: true,
  close: () => {},
};
