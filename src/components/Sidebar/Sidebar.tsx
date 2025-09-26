import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { openMenuSelector } from "../../store/selectors/selector";
import { setSidebarOpen } from "../../store/reducers/reducers";

function Sidebar() {
  const open = useSelector(openMenuSelector);
  const dispatch = useDispatch();

  const closeMenu = () => dispatch(setSidebarOpen(false));

  const categories = [
    "SCIENCE",
    "GENERAL",
    "ENTERTAINMENT",
    "TECHNOLOGY",
    "BUSINESS",
    "HEALTH",
    "SPORTS",
  ];

  return (
    <div className={`sidebar-overlay ${open ? "sidebar-open" : ""}`}>
      <aside
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        tabIndex={open ? 0 : -1}
      >
        <button className="sidebar__close" onClick={closeMenu}>
          ×
        </button>
        <ul className="sidebar__list">
          {categories.map((category) => (
            <li key={category} className="sidebar__item">
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
