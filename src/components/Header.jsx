import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>NC Games</h1>
      <h3>You logged in as {user.username}</h3>
      <p> To change user press this special button </p>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </div>
  );
}

export default Header;
