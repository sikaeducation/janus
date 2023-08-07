import { ComponentStory, ComponentMeta } from '@storybook/react';

import InboxLearnerPromptResponseForm from '.';

export default {
  title: 'Inbox/InboxLearnerPrompt',
  component: InboxLearnerPromptResponseForm,
} as ComponentMeta<typeof InboxLearnerPromptResponseForm>;

const Template: ComponentStory<typeof InboxLearnerPromptResponseForm> = (
  args,
) => <InboxLearnerPromptResponseForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentBroadcast: { prompt: 'Some prompt', responseType: 'markdown' },
  postResponse: (response: string) => console.log(response),
  response: 'Some response',
  setResponse: (response: string) => console.log(response),
};
