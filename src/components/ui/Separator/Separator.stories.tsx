import { ComponentStory, ComponentMeta } from '@storybook/react';

import Separator from '.';

export default {
  title: 'UI/Separator',
  component: Separator,
} as ComponentMeta<typeof Separator>;

const Template: ComponentStory<typeof Separator> = () => <Separator />;

export const Default = Template.bind({});
