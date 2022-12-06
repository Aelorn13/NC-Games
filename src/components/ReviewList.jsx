import { useState, useEffect } from "react";
import { getReviews, patchReview } from "../utils/api";
import { Link } from "react-router-dom";

function ReviewList() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setLoading(false);
      setReviews(reviews);
    });
  }, []);
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

  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="ReviewList">
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <h2>{review.title}</h2>
              <p>Category: {review.category}</p>
              <img src={review.review_img_url} alt={review.title}></img>
              <button onClick={() => handleClickLike(review.review_id)}>
                Like
              </button>
              <p>Votes: {review.votes}</p>
              <label>Comments: {review.comment_count}</label>
              <br></br>
              <Link to={`/reviews/${review.review_id}`}>
                <button>Read review</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewList;
