import { NavLink } from "react-router";

function Home() {
  return (
    <section className="flex flex-col items-center w-full">
      <ul className="menu menu-lg bg-base-200 rounded-box w-11/12 max-w-3xl">
        <li><NavLink to="/file">Task 1 - file upload</NavLink></li>
        <li><NavLink to="/pesel">Task 2 - PESEL validation</NavLink></li>
        <li><NavLink to="/users">Task 3 - users list</NavLink></li>
      </ul>
      <a
        className="link m-6"
        href="https://github.com/mwawrzen/contelizer-recruitment"
        target="_blank"
      >
        Repository
      </a>
    </section>
  );
}

export default Home;
