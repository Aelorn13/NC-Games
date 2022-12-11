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
      <Link className="link ml" to="/">
        Go Back
      </Link>
      {users.map((user) => {
        return (
          <div className="ReviewList">
            <div className="review userinfo" key={user.username}>
              <h1 className="text-center">{user.username}</h1>
              <img
                className="userphoto"
                src={user.avatar_url}
                alt={user.username}
              />
              <div className="text-center mt mb">
                <strong>{user.name}</strong>
              </div>
              <div className="actions">
                <button onClick={() => handleClickChangeUser(user)}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Users;
