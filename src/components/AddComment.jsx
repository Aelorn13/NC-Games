import { useState } from "react";
import { postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
function AddComment({ setComments, review_id }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const handleSubmitAddComment = (e) => {
    if (newComment === "") alert("Unable to send an empty comment");
    else {
      e.preventDefault();
      postComment(newComment, user, review_id).then((commentFromApi) => {
        setNewComment("");
        setComments((comments) => {
          const newComments = [...comments];
          newComments.push(commentFromApi);
          return newComments;
        });
      });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmitAddComment}>
        <label>Send new comment: </label>
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
