import { deleteComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

function DeleteComment({ comment_id, author, setDeleteID }) {
  const { user } = useContext(UserContext);
  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setDeleteID(comment_id);
      //update state of comments somehow?
    });
  };
  return user.username === author ? (
    <button onClick={() => handleDeleteComment(comment_id)}>DELETE ME</button>
  ) : (
    <></>
  );
}
export default DeleteComment;
