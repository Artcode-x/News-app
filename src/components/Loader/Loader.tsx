import "./Loader.css";

function Loader() {
  return (
    <div className="loader" aria-hidden="false">
      <div className="loader__dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default Loader