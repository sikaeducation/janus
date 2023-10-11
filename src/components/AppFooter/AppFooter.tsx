import "./AppFooter.scss";

function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="AppFooter">
      <small>© {currentYear}, Sika Education</small>
    </footer>
  );
}

export default AppFooter;
