import "./Sidebar.css";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <div className={`sidebar-overlay ${open ? "sidebar-open" : ""}`}>
      <aside
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="sidebar__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          ×
        </button>
        <ul className="sidebar__list">
          {[
            "SCIENCE",
            "GENERAL",
            "ENTERTAINMENT",
            "TECHNOLOGY",
            "BUSINESS",
            "HEALTH",
            "SPORTS",
          ].map((cat) => (
            <li key={cat} className="sidebar__item">
              {cat}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
