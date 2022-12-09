import { ComponentStory, ComponentMeta } from "@storybook/react";

import ToastNotification from ".";

export default {
  title: "ToastNotification",
  component: ToastNotification,
} as ComponentMeta<typeof ToastNotification>;

const Template: ComponentStory<typeof ToastNotification> = () => (
  <ToastNotification />
);

export const Default = Template.bind({});
