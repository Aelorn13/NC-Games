import { useState } from "react";
import { postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
function AddComment({ setComments, review_id }) {
  const [newComment, setNewComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useContext(UserContext);
  const handleSubmitAddComment = (e) => {
    if (newComment === "") alert("Unable to send an empty comment");
    else {
      e.preventDefault();
      setIsDisabled(true);
      postComment(newComment, user, review_id).then((commentFromApi) => {
        setNewComment("");
        setComments((comments) => {
          const newComments = [...comments];
          newComments.push(commentFromApi);
          setIsDisabled(false);
          return newComments;
        });
      });
    }
  };
  console.log(isDisabled);
  return (
    <section>
      <form onSubmit={handleSubmitAddComment}>
        <label>Send new comment: </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          disabled={isDisabled ? true : false}
          onClick={handleSubmitAddComment}
        >
          Send comment
        </button>
      </form>
    </section>
  );
}
export default AddComment;
