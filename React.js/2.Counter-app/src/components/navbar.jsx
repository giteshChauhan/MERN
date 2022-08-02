/* 
  Stateless functional component - Rather using a class extending a react component
  class, we can define an sfc. Both have similar function rest depends on our 
  preferences.
*/

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a href="localhost:3000" className="navbar-brand">
        NavBar
        <span className="badge badge-pill badge-secondary m-2">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
