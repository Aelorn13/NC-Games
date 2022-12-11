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
  return (
    <section className="review">
      <form onSubmit={handleSubmitAddComment}>
        <div className="comment add-comment">
          <textarea
            rows="4"
            cols="50"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            placeholder="Add your comment.."
          ></textarea>
          <button
            className="ml"
            type="submit"
            disabled={isDisabled ? true : false}
            onClick={handleSubmitAddComment}
          >
            Add comment
          </button>
        </div>
      </form>
    </section>
  );
}
export default AddComment;
