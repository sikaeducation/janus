import "./TypographyDemo.scss";

export default function Typography() {
  return (
    <div className="TypographyDemo">
      <section>
        <p>Typefaces:</p>
        <div className="heading-typeface">Gill Sans Condensed</div>
        <div className="primary-typeface">Gill Sans</div>
      </section>
      <section>
        <p>Headings:</p>
        <span className="logo-font">Logo Font</span>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
      </section>
      <section>
        <p>Body text</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          I urge you to <strong>boldly</strong> reconsider your position.
        </p>
        <p>
          Are you sure that's what you <em>actually</em> want to do?
        </p>
        <p>
          <pre>
            <code>
              {`function someFunction(someParameter: someType){
  return someParameter;
}`}
            </code>
          </pre>
        </p>
        <small>
          <small>This is the fine print</small>
        </small>
        <ul>
          <li>Unordered List 1</li>
          <li>Unordered List 2</li>
          <li>Unordered List 3</li>
        </ul>
        <ol>
          <li>Ordered List 1</li>
          <li>Ordered List 2</li>
          <li>Ordered List 3</li>
        </ol>
        <blockquote>This is a blockquote</blockquote>
      </section>
      <section>
        <p>Font sizes</p>
        <p className="size-1">Font size 1</p>
        <p className="size-2">Font size 2</p>
        <p className="size-3">Font size 3</p>
        <p className="size-4">Font size 4</p>
        <p className="size-5">Font size 5</p>
        <p className="size-6">Font size 6</p>
        <p className="size-7">Font size 7</p>
        <p className="size-8">Font size 8</p>
        <p className="size-9">Font size 9</p>
        <p className="size-10">Font size 10</p>
        <p className="size-11">Font size 11</p>
      </section>
    </div>
  );
}