import { ComponentStory, ComponentMeta } from '@storybook/react';

import InboxResponses from '.';

export default {
  title: 'Inbox/InboxResponses',
  component: InboxResponses,
} as ComponentMeta<typeof InboxResponses>;

const Template: ComponentStory<typeof InboxResponses> = (args) => (
  <InboxResponses {...args} />
);

export const Default = Template.bind({});
Default.args = {
  performances: [],
};
