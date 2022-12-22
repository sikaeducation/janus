import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toast from ".";

import Notification from "../../AppNotification";

export default {
  title: "App/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;
export const SingleNotification = Template.bind({});
SingleNotification.args = {
  children: <Notification />,
};
export const MultipleNotification = Template.bind({});
MultipleNotification.args = {
  children: [<Notification />, <Notification />, <Notification />],
};
