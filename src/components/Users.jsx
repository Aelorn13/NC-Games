import { useEffect, useState } from "react";
import { getUsers } from "../utils/api.js";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
//make it flexbox with resopnsive design
function Users() {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleClickChangeUser = (user) => {
    setUser(user);
  };
  return (
    <div>
      <Link to="/">
        <button>Go Home</button>
      </Link>
      {users.map((user) => {
        return (
          <div key={user.username}>
            <h1>{user.username}</h1>
            <br />
            <h3>{user.name}</h3>
            <br />
            <img src={user.avatar_url} alt={user.username} />
            <br />
            <button onClick={() => handleClickChangeUser(user)}>Log in</button>
          </div>
        );
      })}
    </div>
  );
}
export default Users;
