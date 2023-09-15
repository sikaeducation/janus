import { ComponentStory, ComponentMeta } from "@storybook/react";

import Notification from ".";

export default {
	title: "UI/Notification",
	component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = () => <Notification />;

export const Default = Template.bind({});
