import "./App.scss";
import AppHeader from "../components/AppHeader";

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader programLabel="Ford: Full-Stack Web Development" />
        <div className="constrained-container">
          <nav className="unit-navigation">
            <ul>
              <li>
                <a className="unit-link" href="https://google.com">
                  1
                </a>
              </li>
              <li>
                <a className="unit-link active" href="https://google.com">
                  2
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="crumb-navigation">
          <ol>
            <li>
              <a href="google.com">Website Development</a>
            </li>
            <li>
              <a href="google.com">CLI</a>
            </li>
          </ol>
        </nav>
      </header>
      <div className="constrained-container">
        <section className="unit">
          <h3>Website Development</h3>
          <nav className="section-navigation">
            <ul>
              <li>
                <a className="section-link" href="https://google.com">
                  CLI
                </a>
              </li>
              <li>
                <a className="section-link" href="https://google.com">
                  Git
                </a>
              </li>
              <li>
                <a className="section-link" href="https://google.com">
                  Websites I
                </a>
              </li>
              <li>
                <a className="section-link" href="https://google.com">
                  Websites II
                </a>
              </li>
              <li>
                <a className="section-link" href="https://google.com">
                  Websites III
                </a>
              </li>
            </ul>
          </nav>
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
      <footer>
        <small>© 2022, Sika Education</small>
      </footer>
    </div>
  );
}

export default App;
