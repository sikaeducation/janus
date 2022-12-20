import { ComponentStory, ComponentMeta } from "@storybook/react";

import Form from ".";
import Button from "../Button";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default {
  title: "UI/Form",
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: "Some Form",
  newItem: {
    someField: "Some Value",
  },
  fields: [
    {
      id: "some-field",
      label: "Some Field",
      Component: TextInput,
      type: undefined,
    },
    {
      id: "some-other-field",
      label: "Some Other Field",
      Component: TextArea,
    },
  ],
  actions: [
    {
      label: "Some Action",
      Component: Button,
      type: "secondary",
      size: "large",
      action: () => console.log("Hello, world!"),
    },
    {
      label: "Some Other Action",
      Component: Button,
      type: "primary",
      size: "large",
      action: () => console.log("Hello, world!"),
    },
  ],
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  ...Default.args,
  children: <p>Some free text here</p>,
};
