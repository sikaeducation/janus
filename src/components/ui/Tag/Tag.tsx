import { ReactNode } from 'react';
import './Tag.scss';

type Props = {
  children: ReactNode;
};

export default function Tag({ children }: Props) {
  return <span className="Tag">{children}</span>;
}
