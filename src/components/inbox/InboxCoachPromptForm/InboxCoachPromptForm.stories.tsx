import { ComponentStory, ComponentMeta } from "@storybook/react";

import InboxCoachPromptForm from ".";

export default {
  title: "Inbox/InboxCoachPromptForm",
  component: InboxCoachPromptForm,
} as ComponentMeta<typeof InboxCoachPromptForm>;

const Template: ComponentStory<typeof InboxCoachPromptForm> = (args) => (
  <InboxCoachPromptForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  startPrompt: (broadcast: rawBroadcast) => console.log(broadcast),
  prompt: "Some prompt",
  setPrompt: (prompt: string) => console.log(prompt),
  tagString: "some-tag",
  setTagString: (tagString: string) => console.log(tagString),
};
