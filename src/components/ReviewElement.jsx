import { useState, useEffect } from "react";
import {
  getReviewById,
  getCommentsByReviewId,
  patchComment,
  postComment,
} from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link, useParams } from "react-router-dom";
function ReviewElement() {
  const { review_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getReviewById(review_id).then((review) => {
      setLoading(false);
      setReview(review);
    });
  }, [review_id]);
  useEffect(() => {
    getCommentsByReviewId(review_id).then((comments) => {
      setComments(comments);
    });
  }, [review_id]);
  //<======================================adding comment
  //maybe can make it into whole new component somehow
  const handleSubmutAddComment = (e) => {
    e.preventDefault();
    postComment(newComment, user, review_id).then((commentFromApi) => {
      setNewComment("");
      setComments((comments) => {
        const newComments = [...comments];
        newComments.unshift(commentFromApi);
        return newComments;
      });
    });
    // setNewComment(newComment);
    // setComments([...comments, newComment]);
    // setNewComment("");
  };
  //<============================update comment votes
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
  //<============================update comment votes end

  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="ReviewElement">
      <h2>{review.title}</h2>
      <p>Category: {review.category}</p>
      <p>posted by: {review.owner}</p>
      <img src={review.review_img_url} alt={review.title}></img>
      <p>Designer: {review.designer}</p>
      <button>Like this review</button>
      <p>Votes: {review.votes}</p>
      <a>{review.review_body}</a>
      <h3>Comments:</h3>
      <ol>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <h5>{comment.author}</h5>
              <a>{comment.body}</a>
              <p>Likes: {comment.votes}</p>
              <button onClick={() => handleClickLike(comment.comment_id)}>
                Like this comment
              </button>
            </div>
          );
        })}
      </ol>
      <br></br>
      <form onSubmit={handleSubmutAddComment}>
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
export default ReviewElement;
