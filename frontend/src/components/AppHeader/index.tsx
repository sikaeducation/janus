import "./AppHeader.scss";

type props = {
  programLabel: string;
};

function AppHeader({ programLabel }: props) {
  return (
    <div className="AppHeader">
      <h1>Sika</h1>
      <h2>{programLabel}</h2>
    </div>
  );
}

export default AppHeader;
