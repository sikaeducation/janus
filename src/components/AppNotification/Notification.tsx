import './Notification.scss';

type Props = {
  message?: string;
};

function Notification({ message = 'New activity!' }: Props) {
  return (
    <div className="Notification">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
