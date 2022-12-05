import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
function ReviewList() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setLoading(false);
      setReviews(reviews);
    });
  }, []);
  const handleClickReview = (e) => {};

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
              <p>Designer: {review.designer}</p>
              <p>Votes: {review.votes}</p>
              <label>Comments: {review.comment_count}</label>
              <br></br>
              <button onClick={handleClickReview}>Read review</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewList;
