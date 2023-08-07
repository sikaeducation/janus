import './Avatar.scss';

type Props = {
  imageUrl: string;
  altText: string;
};

export default function Avatar({ imageUrl, altText }: Props) {
  return <img className="Avatar" src={imageUrl} alt={altText} />;
}
