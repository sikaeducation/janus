import { Skeleton } from "@material-ui/lab";

export const fields = [
  {
    header: "Type",
    key: "type",
    proportion: {
      large: "5%",
    },
  },
  {
    header: "Live",
    key: "publishedIcon",
    proportion: {
      large: "5%",
    },
  },
  {
    header: "Name",
    key: "title",
    proportion: {
      large: "40%",
      small: "100%",
    },
  },
  {
    header: "Description",
    key: "description",
    proportion: {
      large: "50%",
    },
  },
];

const skeletonRow = {
  type: <Skeleton />,
  publishedIcon: <Skeleton />,
  title: <Skeleton />,
  description: <Skeleton />,
};

export const skeletonRows = Array(10).fill(skeletonRow);
