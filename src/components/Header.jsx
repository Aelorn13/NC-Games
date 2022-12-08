import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1 className="Header">NC Games</h1>
      <h3>You logged in as {user.username}</h3>
      <Link to="/users">
        <button className="buttonUsers">Change user</button>
      </Link>
    </div>
  );
}

export default Header;
