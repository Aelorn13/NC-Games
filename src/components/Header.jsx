import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="Header">
      <h2 className="mb">NC Games</h2>
      <div className="tooltip-toggle">
        You logged in as
        <Link className="link ml" to="/users">
          {user.username}
        </Link>
        <div className="tooltip">Change user</div>
      </div>
    </div>
  );
}

export default Header;
