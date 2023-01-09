import { ComponentStory, ComponentMeta } from "@storybook/react";

import ArticleDetail from ".";

export default {
  title: "ArticleDetail",
  component: ArticleDetail,
} as ComponentMeta<typeof ArticleDetail>;

const Template: ComponentStory<typeof ArticleDetail> = (args) => {
  return <ArticleDetail {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  activity: {
    _type: "Article",
    title: "Title",
    post_slug: "post_slug",
    description: "Description",
    published: true,
  },
};
