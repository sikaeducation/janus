import { ComponentStory, ComponentMeta } from "@storybook/react";

import { withReactContext } from "storybook-react-context";
import InboxCoachPromptDisplay from ".";
import { performanceContext } from "../../../contexts/performance";

export default {
  title: "Inbox/CoachInboxPromptDisplay",
  component: InboxCoachPromptDisplay,
  decorators: [
    withReactContext({
      Context: performanceContext,
      initialState: { performances: [] },
    }),
  ],
} as ComponentMeta<typeof InboxCoachPromptDisplay>;

const Template: ComponentStory<typeof InboxCoachPromptDisplay> = (args) => (
  <InboxCoachPromptDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tags: ["some-tag", "some-other-tag"],
  prompt: "Some prompt",
  endPrompt: () => {},
  slug: "some-slug",
};
