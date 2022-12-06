import axios from "axios";

const beGamesApi = axios.create({
  baseURL: "https://dead-pink-hare-garb.cyclic.app/api",
});
//I tried to use this one to get my one review
//never used it before so maybe this is just absoulutely wrong and dosn't work this way at all
export const getReviews = () => {
  return beGamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};
export const getUsers = () => {
  return beGamesApi.get("/users").then((res) => {
    return res.data.users;
  });
};
export const getReviewById = (review_id) => {
  return beGamesApi.get("/reviews/" + review_id).then((res) => {
    return res.data.review;
  });
};

//for query
//    .get("/reviews/:review:id/comments", { params: {review_id} })

export const getCommentsByReviewId = (review_id) => {
  return beGamesApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};
export const patchComment = (comment_id) => {
  const patchBody = { inc_votes: 1 };
  return beGamesApi
    .patch(`/comments/${comment_id}`, patchBody)
    .then(({ data }) => {
      return data.comment;
    });
};
export const patchReview = (review_id) => {
  const patchBody = { inc_votes: 1 };
  return beGamesApi
    .patch(`/reviews/${review_id}`, patchBody)
    .then(({ data }) => {
      return data.comment;
    });
};

//also should be username
export const postComment = (newCommentText, user, review_id) => {
  const postBody = {
    username: user.username,
    body: newCommentText,
  };
  console.log(postBody);
  return beGamesApi
    .post(`/reviews/${review_id}/comments`, postBody)
    .then(({ data }) => {
      return data.comment;
    });
};
