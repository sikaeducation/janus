import { ComponentStory, ComponentMeta } from "@storybook/react";

import Skeleton from ".";

export default {
  title: "UI/Skeleton",
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = () => <Skeleton />;

export const Default = Template.bind({});
