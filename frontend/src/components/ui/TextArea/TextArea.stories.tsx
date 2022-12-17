import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import TextArea from ".";

export default {
  title: "UI/TextArea",
  component: TextArea,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [currentContent, setContent] = useState(args.value ?? "");
  return <TextArea {...args} action={setContent} value={currentContent} />;
};

export const Default = Template.bind({});
Default.args = {
  value: "Some content",
  id: "some-id",
  label: "Some label",
  isRequired: true,
};
