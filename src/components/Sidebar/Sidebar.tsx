import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { openMenuSelector } from "../../store/selectors/selector";
import { setSidebarOpen } from "../../store/reducers/reducers";

function Sidebar() {
  const open = useSelector(openMenuSelector);
  const dispatch = useDispatch();

  const closeMenu = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <div className={`sidebar-overlay ${open ? "sidebar-open" : ""}`}>
      <aside
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="sidebar__close"
          aria-label="Close menu"
          onClick={closeMenu}
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
