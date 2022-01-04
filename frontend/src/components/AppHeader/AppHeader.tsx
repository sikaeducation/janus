import "./AppHeader.scss";

type props = {
  programLabel: string;
};

function AppHeader({ programLabel }: props) {
  return (
    <header className="AppHeader">
      <span className="logo">Sika</span>
      <span className="program-label">{programLabel}</span>
    </header>
  );
}

export default AppHeader;
