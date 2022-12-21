import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";

import InboxCoach from ".";
import { promptContext } from "../../../contexts/prompt";

export default {
  title: "Inbox/InboxCoach",
  component: InboxCoach,
  decorators: [
    withReactContext({
      Context: promptContext,
      initialState: {
        currentBroadcast: "",
        startInboxPrompt: () => {},
        endInboxPrompt: () => {},
        getCurrentPrompt: () => "Hey",
      },
    }),
  ],
} as ComponentMeta<typeof InboxCoach>;

const Template: ComponentStory<typeof InboxCoach> = () => <InboxCoach />;

export const Default = Template.bind({});
