import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import Breadcrumbs from ".";

export default {
  title: "UI/Breadcrumbs",
  component: Breadcrumbs,
  decorators: [withRouter],
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const NoLinks = Template.bind({});
NoLinks.args = {
  links: [],
};

export const OneLink = Template.bind({});
OneLink.args = {
  links: [
    {
      path: "/some-path",
      label: "Some Label",
      slug: "some-slug",
    },
  ],
};

export const TwoLinks = Template.bind({});
TwoLinks.args = {
  links: [
    {
      path: "/some-path",
      label: "Some Label",
      slug: "some-slug",
    },
    {
      path: "/some-other-path",
      label: "Some Other Label",
      slug: "some-other-slug",
    },
  ],
};

export const MultipleLinks = Template.bind({});
MultipleLinks.args = {
  links: [
    {
      path: "/some-path",
      label: "Some Label",
      slug: "some-slug",
    },
    {
      path: "/some-other-path",
      label: "Some Other Label",
      slug: "some-other-slug",
    },
    {
      path: "/yet-another-path",
      label: "Yet Another Label",
      slug: "yet-another-slug",
    },
  ],
};