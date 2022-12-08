import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";

import InboxLearner from ".";
import { performanceContext } from "../../contexts/performance";
import { promptContext } from "../../contexts/prompt";

export default {
  title: "Inbox/InboxLearner",
  component: InboxLearner,
  decorators: [
    withReactContext({
      Context: performanceContext,
      initialState: { postPerformance: () => {}, performances: [] },
    }),
    withReactContext({
      Context: promptContext,
      initialState: {
        currentBroadcast: {
          prompt: "Some Prompt",
        },
      },
    }),
  ],
} as ComponentMeta<typeof InboxLearner>;

const Template: ComponentStory<typeof InboxLearner> = () => <InboxLearner />;

export const Default = Template.bind({});
