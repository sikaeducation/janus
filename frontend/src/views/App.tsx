import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <div className="primary-header">
          <h1>Sika</h1>
          <h2>Ford: Full-Stack Web Development</h2>
        </div>
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
      </header>
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
          <p>Content</p>
        </main>
      </section>
      <footer>
        <small>© 2022, Sika Education</small>
      </footer>
    </div>
  );
}

export default App;
