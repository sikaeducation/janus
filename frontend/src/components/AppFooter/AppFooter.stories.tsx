import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppFooter from ".";

export default {
  title: "App/AppFooter",
  component: AppFooter,
} as ComponentMeta<typeof AppFooter>;

const Template: ComponentStory<typeof AppFooter> = () => <AppFooter />;

export const Default = Template.bind({});
