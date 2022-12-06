import { useState, useEffect } from "react";
import { getReviewById, patchReview } from "../utils/api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
function ReviewElement() {
  const { review_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});

  useEffect(() => {
    getReviewById(review_id).then((review) => {
      setLoading(false);
      setReview(review);
    });
  }, [review_id]);
  const handleClickLikeReview = () => {
    setReview({ ...review, votes: review.votes + 1 });
    patchReview(review_id).catch((err) => {
      alert("Sorry - please try again");
      setReview({ ...review, votes: review.votes - 1 });
    });
  };
  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="ReviewElement">
      <h2>{review.title}</h2>
      <p>Category: {review.category}</p>
      <p>posted by: {review.owner}</p>
      <img src={review.review_img_url} alt={review.title}></img>
      <p>Designer: {review.designer}</p>
      <button onClick={handleClickLikeReview}>Like this review</button>
      <p>Votes: {review.votes}</p>
      <p>{review.review_body}</p>
      <Comments review_id={review.review_id} />
    </div>
  );
}
export default ReviewElement;
