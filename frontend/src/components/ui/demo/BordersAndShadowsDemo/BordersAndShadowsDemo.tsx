import "./BordersAndShadows.scss";

export default function BordersAndShadows() {
  return (
    <div className="BordersAndShadows">
      <section>
        <p>Border radius</p>
        <div className="border-radius">&nbsp;</div>
        <p>Trace</p>
        <div className="trace">&nbsp;</div>
      </section>
      <section>
        <p>Low shadow</p>
        <div className="low-shadow">&nbsp;</div>
        <p>High shadow</p>
        <div className="high-shadow">&nbsp;</div>
        <p>Shade</p>
        <div className="shade-container">
          <div className="shade">&nbsp;</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    </div>
  );
}
