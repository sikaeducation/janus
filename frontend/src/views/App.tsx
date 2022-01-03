import "./App.scss";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import UnitNavigation from "../components/UnitNavigation";
import SectionNavigation from "../components/SectionNavigation";
import CrumbNavigation from "../components/CrumbNavigation";

const units = [
  {
    id: 1,
    label: "0",
    url: "https://google.com",
  },
  {
    id: 2,
    label: "1",
    url: "https://google.com",
  },
  {
    id: 3,
    label: "2",
    url: "https://google.com",
  },
  {
    id: 4,
    label: "3",
    url: "https://google.com",
  },
  {
    id: 5,
    label: "4",
    url: "https://google.com",
  },
  {
    id: 6,
    label: "5",
    url: "https://google.com",
  },
];

const sections = [
  {
    id: 1,
    label: "CLI",
    url: "https://google.com",
  },
  {
    id: 2,
    label: "Git",
    url: "https://google.com",
  },
  {
    id: 3,
    label: "Websites I",
    url: "https://google.com",
  },
  {
    id: 4,
    label: "Websites II",
    url: "https://google.com",
  },
  {
    id: 5,
    label: "Websites III",
    url: "https://google.com",
  },
];

const crumbs = [
  {
    id: 1,
    label: "CLI",
    url: "https://google.com",
  },
  {
    id: 2,
    label: "Git",
    url: "https://google.com",
  },
];

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader programLabel="Ford: Full-Stack Web Development" />
        <div className="constrained-container">
          <UnitNavigation units={units} />
        </div>
        <CrumbNavigation links={crumbs} />
      </header>
      <div className="constrained-container">
        <section className="unit">
          <h3>Website Development</h3>
          <SectionNavigation sections={sections} />
          <main className="section-content">
            <h4>CLI</h4>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </p>
          </main>
        </section>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
