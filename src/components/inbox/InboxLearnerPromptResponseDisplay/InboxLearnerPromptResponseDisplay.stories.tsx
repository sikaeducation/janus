import { ComponentStory, ComponentMeta } from '@storybook/react';

import InboxLearnerPromptResponseDisplay from '.';

export default {
  title: 'Inbox/InboxLearnerPromptResponseDisplay',
  component: InboxLearnerPromptResponseDisplay,
} as ComponentMeta<typeof InboxLearnerPromptResponseDisplay>;

const Template: ComponentStory<typeof InboxLearnerPromptResponseDisplay> = (
  args,
) => <InboxLearnerPromptResponseDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentBroadcast: { responseType: 'markdown', prompt: 'Some prompt' },
  response: 'Some response',
};
