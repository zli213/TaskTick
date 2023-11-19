import './ListContentHeader.scss';

export function ListContentHeader({title}) {
  return (
    <header className="view_header">
      <div className="view_header_content">
        <h1>
          <span>{title}</span>
          <small>10.05</small>
        </h1>
        <div>
          <button className="check_button">
            <div>icon</div>
            <span>check</span>
          </button>
        </div>
      </div>
    </header>
  );
}
