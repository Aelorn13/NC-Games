import { useEffect, useState } from "react";
import { getCommentsByReviewId, patchComment, postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
function Comments({ review_id }) {
  console.log(review_id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    getCommentsByReviewId(review_id).then((comments) => {
      setComments(comments);
    });
  }, [review_id]);

  const handleSubmitAddComment = (e) => {
    e.preventDefault();
    postComment(newComment, user, review_id).then((commentFromApi) => {
      setNewComment("");
      setComments((comments) => {
        const newComments = [...comments];
        newComments.unshift(commentFromApi);
        return newComments;
      });
    });
  };
  const handleClickLike = (comment_id) => {
    setComments((comments) => {
      return comments.map((comment) => {
        if (comment.comment_id === comment_id) {
          return { ...comment, votes: comment.votes + 1 };
        }
        return comment;
      });
    });
    patchComment(comment_id).catch((err) => {
      alert("Sorry - please try again");
      setComments((comments) => {
        return comments.map((comment) => {
          if (comment.comment_id === comment_id) {
            return { ...comment, votes: comment.votes - 1 };
          }
          return comment;
        });
      });
    });
  };

  return comments.length === 0 ? (
    <div>
      <h3>Comments:</h3>
      <p> No comments yet</p>
      <br></br>
      <form onSubmit={handleSubmitAddComment}>
        <label>Your new special and important comment: </label>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></input>
      </form>
      <button type="submit">Send comment</button>
    </div>
  ) : (
    <div>
      <h3>Comments:</h3>
      <ol>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <h5>{comment.author}</h5>
              <p>{comment.body}</p>
              <p>Likes: {comment.votes}</p>
              <button onClick={() => handleClickLike(comment.comment_id)}>
                Like this comment
              </button>
            </div>
          );
        })}
      </ol>
      <br></br>
      <form onSubmit={handleSubmitAddComment}>
        <label>Your new special and important comment: </label>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></input>
      </form>
      <button type="submit">Send comment</button>
    </div>
  );
}
export default Comments;
