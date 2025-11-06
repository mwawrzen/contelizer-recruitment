import { NavLink } from "react-router";

type LinkType = {
  path: string;
  text: string;
}

const links: LinkType[] = [
  { path: '/file', text: 'Task 1' },
  { path: '/pesel', text: 'Task 2' },
  { path: '/users', text: 'Task 3' },
];

function NavOption({ path, text }: LinkType) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => isActive ? 'text-accent' : ''}
      >
        {text}
      </NavLink>
    </li>
  );
}

const navLinks = links.map(({ path, text }, i) => (
  <NavOption key={i} path={path} text={text} />
));

function Navbar() {
  return (
    <nav className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Contelizer - recruitment
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
