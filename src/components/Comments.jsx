import { useEffect, useState } from "react";
import { getCommentsByReviewId, patchComment } from "../utils/api";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
function Comments({ review_id }) {
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteID] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByReviewId(review_id).then((comments) => {
      setLoading(false);
      setComments(comments);
    });
  }, [review_id, deleteID]);
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
  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      <h3>Comments:</h3>
      {comments.length === 0 ? (
        <p> No comments yet</p>
      ) : (
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
                <DeleteComment
                  setDeleteID={setDeleteID}
                  comment_id={comment.comment_id}
                  author={comment.author}
                />
              </div>
            );
          })}
        </ol>
      )}
      <br></br>
      <AddComment setComments={setComments} review_id={review_id} />
    </div>
  );
}

export default Comments;
