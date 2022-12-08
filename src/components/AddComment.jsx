import { useState } from "react";
import { postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
function AddComment({ setComments, review_id }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const handleSubmitAddComment = (e) => {
    e.preventDefault();
    postComment(newComment, user, review_id).then((commentFromApi) => {
      setNewComment("");
      setComments((comments) => {
        const newComments = [...comments];
        newComments.push(commentFromApi);
        return newComments;
      });
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmitAddComment}>
        <label>Your new special and important comment: </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit" onClick={handleSubmitAddComment}>
          Send comment
        </button>
      </form>
    </section>
  );
}
export default AddComment;
