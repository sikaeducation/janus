import { Skeleton } from "@sikaeducation/ui";

type Field = {
  header: string;
  key: string;
  proportion: {
    large: string;
    small?: string;
  };
};

export const fields: Field[] = [
  {
    header: "Type",
    key: "type",
    proportion: {
      large: "2em",
    },
  },
  {
    header: "Live",
    key: "publishedIcon",
    proportion: {
      large: "2em",
    },
  },
  {
    header: "Name",
    key: "title",
    proportion: {
      large: "20em",
      small: "100%",
    },
  },
  {
    header: "Description",
    key: "description",
    proportion: {
      large: "1fr",
    },
  },
];

export const skeletonRows = Array(10)
  .map((_, index) => (
    <div key={index} aria-role="presentation">
      <span className="type"><Skeleton /></span>
      <span className="publishedIcon"><Skeleton /></span>
      <span className="title"><Skeleton /></span>
      <span className="description"><Skeleton /></span>
    </div>
  ));
