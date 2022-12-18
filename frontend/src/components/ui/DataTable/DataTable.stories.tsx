import { ComponentStory, ComponentMeta } from "@storybook/react";

import DataTable from ".";

export default {
  title: "UI/DataTable",
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  fields: [],
  tableData: [],
};

export const NoData = Template.bind({});
NoData.args = {
  fields: [
    {
      header: "Header 1",
      proportion: "30%",
      key: "header_1",
    },
    {
      header: "Header 2",
      proportion: "40%",
      key: "header_2",
    },
    {
      header: "Header 3",
      proportion: "30%",
      key: "header_3",
    },
  ],
  tableData: [],
};

export const OneRow = Template.bind({});
OneRow.args = {
  fields: [
    {
      header: "Header 1",
      proportion: "30%",
      key: "header_1",
    },
    {
      header: "Header 2",
      proportion: "40%",
      key: "header_2",
    },
    {
      header: "Header 3",
      proportion: "30%",
      key: "header_3",
    },
  ],
  tableData: [
    {
      id: "1",
      header_1: "Data one",
      header_2: "Data two",
      header_3: "Data three",
    },
  ],
};

export const MultipleRows = Template.bind({});
MultipleRows.args = {
  fields: [
    {
      header: "Header 1",
      proportion: "10%",
      key: "header_1",
    },
    {
      header: "Header 2",
      proportion: "80%",
      key: "header_2",
    },
    {
      header: "Header 3",
      proportion: "10%",
      key: "header_3",
    },
  ],
  tableData: [
    {
      id: "1",
      header_1: "Data one",
      header_2: "Data two",
      header_3: "Data three",
    },
    {
      id: "2",
      header_1: "Data one",
      header_2: "Data two",
      header_3: "Data three",
    },
    {
      id: "3",
      header_1: "Data one",
      header_2: "Data two",
      header_3: "Data three",
    },
  ],
};

export const LongField = Template.bind({});
LongField.args = {
  fields: [
    {
      header: "Header 1",
      proportion: "auto",
      key: "header_1",
    },
    {
      header: "Header 2",
      proportion: "1fr",
      key: "header_2",
    },
    {
      header: "Header 3",
      proportion: "20%",
      key: "header_3",
    },
  ],
  tableData: [
    {
      id: "1",
      header_1: "Data one",
      header_2:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      header_3: "Data three",
    },
  ],
};

export const MobileFields = Template.bind({});
MobileFields.args = {
  fields: [
    {
      header: "Header 1",
      proportion: {
        large: "30%",
      },
      key: "header_1",
    },
    {
      header: "Header 2",
      proportion: {
        large: "40%",
        small: "100%",
      },
      key: "header_2",
    },
    {
      header: "Header 3",
      proportion: {
        large: "30%",
      },
      key: "header_3",
    },
  ],
  tableData: [
    {
      id: "1",
      header_1: "Data one",
      header_2:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      header_3: "Data three",
    },
  ],
};
MobileFields.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
