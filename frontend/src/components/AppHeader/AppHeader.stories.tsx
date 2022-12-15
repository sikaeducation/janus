import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import AppHeader from ".";

export default {
  title: "App/AppHeader",
  component: AppHeader,
  decorators: [withRouter],
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = () => <AppHeader />;

export const Default = Template.bind({});
