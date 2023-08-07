import { Skeleton } from '@material-ui/lab';
import { Field } from '../../components/ui/DataTable/DataTable';

export const fields: Field[] = [
  {
    header: 'Type',
    key: 'type',
    proportion: {
      large: '2em',
    },
  },
  {
    header: 'Live',
    key: 'publishedIcon',
    proportion: {
      large: '2em',
    },
  },
  {
    header: 'Name',
    key: 'title',
    proportion: {
      large: '20em',
      small: '100%',
    },
  },
  {
    header: 'Description',
    key: 'description',
    proportion: {
      large: '1fr',
    },
  },
];

const skeletonRow = {
  type: <Skeleton />,
  publishedIcon: <Skeleton />,
  title: <Skeleton />,
  description: <Skeleton />,
};

export const skeletonRows = Array(10)
  .fill(skeletonRow)
  .map((row, index) => ({ ...row, id: index }));
