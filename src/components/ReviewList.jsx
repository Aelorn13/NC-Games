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
  const formatCategory = (category) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
    );
  };
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
      <div className="text-center">
        <h1 className="not-found-text">This category does not exist!</h1>
        <NotFound />
      </div>
    );
  }
  return loading ? (
    <div className="ReviewList">
      <p>loading...</p>
    </div>
  ) : (
    <div className="ReviewList">
      <div className="sortButtonsInLine">
        <ChangeCategory />
        <ChangeSort queries={queries} setQueries={setQueries} />
      </div>
      <ul>
        {reviews.map((review) => {
          return (
            <div key={review.review_id} className="review">
              <li>
                <h2 className="mt mb text-center">{review.title}</h2>
                <img
                  className="mb"
                  src={review.review_img_url}
                  alt={review.title}
                ></img>
                <div className="statsList card-body">
                  <p>
                    <strong>Category:</strong> {formatCategory(review.category)}
                  </p>
                  <p>
                    <strong>Created at:</strong>{" "}
                    {review.created_at.slice(0, 10)}
                  </p>
                  <p>
                    <strong>Votes:</strong> {review.votes}
                  </p>
                  <p>
                    <strong>Comments:</strong> {review.comment_count}
                  </p>
                </div>
                <div className="actions card-body">
                  <button onClick={() => handleClickLike(review.review_id)}>
                    Vote
                  </button>
                  <Link to={`/reviews/${review.review_id}`}>
                    <button>Read</button>
                  </Link>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewList;
