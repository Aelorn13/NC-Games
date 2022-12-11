import { useState, useEffect } from "react";
import { getReviewById, patchReview } from "../utils/api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

function ReviewElement() {
  const { review_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});
  const [error, setError] = useState(false);
  useEffect(() => {
    getReviewById(review_id)
      .then((review) => {
        setLoading(false);
        setReview(review);
      })
      .catch((err) => {
        setError(true);
      });
  }, [review_id]);
  const formatCategory = (category) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
    );
  };
  const handleClickLikeReview = () => {
    setReview({ ...review, votes: review.votes + 1 });
    patchReview(review_id).catch((err) => {
      alert("Sorry - please try again");
      setReview({ ...review, votes: review.votes - 1 });
    });
  };
  if (error) {
    return (
      <div className="text-center">
        <h1 className="not-found-text">This review does not exist!</h1>
        <NotFound />
      </div>
    );
  }
  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      <Link className="link ml" to="/">
        Go Back
      </Link>

      <div className="ReviewList">
        <div className="sortButtonsInLine">
          <div className="review">
            <h2 className="text-center">{review.title}</h2>
            <div className="review-body">
              <div>
                <img src={review.review_img_url} alt={review.title}></img>
                <p>
                  <strong>Category:</strong> {formatCategory(review.category)}
                </p>
                <p>
                  <strong>Posted by:</strong> {review.owner}
                </p>
                <p>
                  <strong>Designer:</strong> {review.designer}
                </p>
              </div>
              <div>
                <p>{review.review_body}</p>
              </div>
            </div>

            <div className="actions">
              <p className="mr">Votes: {review.votes}</p>
              <button onClick={handleClickLikeReview}>Like</button>
            </div>
          </div>
        </div>
        <Comments review_id={review.review_id} />
      </div>
    </div>
  );
}
export default ReviewElement;
