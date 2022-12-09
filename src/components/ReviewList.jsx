import { useState, useEffect } from "react";
import { getReviews, patchReview } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import ChangeCategory from "./ChangeCategory";
import ChangeSort from "./ChangeSort";
import NotFound from "./NotFound";
function ReviewList() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [queries, setQueries] = useState({});

  const { category } = useParams();
  useEffect(() => {
    setError(false);
    getReviews(category, queries)
      .then((reviews) => {
        setLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setError(true);
      });
  }, [category, queries]);

  const handleClickLike = (review_id) => {
    setReviews((reviews) => {
      return reviews.map((review) => {
        if (review.review_id === review_id) {
          return { ...review, votes: review.votes + 1 };
        }
        return review;
      });
    });
    patchReview(review_id).catch((err) => {
      alert("Sorry - please try again");
      setReviews((reviews) => {
        return reviews.map((review) => {
          if (review.review_id === review_id) {
            return { ...review, votes: review.votes - 1 };
          }
          return review;
        });
      });
    });
  };
  if (error) {
    return (
      <div>
        <h1>This category does not exist</h1>
        <NotFound />
      </div>
    );
  }
  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="ReviewList">
      <div className="sortButtonsInLine">
        <ChangeCategory />
        <ChangeSort queries={queries} setQueries={setQueries} />
      </div>
      <ul>
        {reviews.map((review) => {
          return (
            <li className="review" key={review.review_id}>
              <h2>{review.title}</h2>
              <p>Category: {review.category}</p>
              <img src={review.review_img_url} alt={review.title}></img>
              <div>
                <p>Created at: {review.created_at.slice(0, 10)}</p>
                <p>Votes: {review.votes}</p>
                <button onClick={() => handleClickLike(review.review_id)}>
                  Like
                </button>
                <label>Comments: {review.comment_count}</label>
                <Link to={`/reviews/${review.review_id}`}>
                  <button>Read review</button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewList;
