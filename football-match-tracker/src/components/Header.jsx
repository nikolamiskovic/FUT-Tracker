import { NavLink } from "react-router-dom";

function Header() {
  function getLinkClass({ isActive }) {
    return isActive ? "nav-link nav-link--active" : "nav-link";
  }

  return (
    <header className="header">
      <div className="header-brand">⚽ FUT-Tracker</div>
      <nav>
        <ul className="header-nav">
          <li>
            <NavLink to="/" className={getLinkClass} end>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/matches" className={getLinkClass}>
              Matcher
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={getLinkClass}>
              Favoriter
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;