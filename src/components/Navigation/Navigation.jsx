import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLocalMovies } from "react-icons/md";

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={getLinkClass}>
        <IoHomeOutline />
        &nbsp;Home
      </NavLink>
      <NavLink to="/movies" className={getLinkClass}>
        <MdOutlineLocalMovies />
        &nbsp;Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
