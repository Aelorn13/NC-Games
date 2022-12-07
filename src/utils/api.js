import axios from "axios";

const beGamesApi = axios.create({
  baseURL: "https://dead-pink-hare-garb.cyclic.app/api",
});

export const getReviews = (category) => {
  return beGamesApi.get("/reviews", { params: { category } }).then((res) => {
    return res.data.reviews;
  });
};

export const getUsers = () => {
  return beGamesApi.get("/users").then((res) => {
    return res.data.users;
  });
};
export const getCategories = () => {
  return beGamesApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};
export const getReviewById = (review_id) => {
  return beGamesApi.get("/reviews/" + review_id).then((res) => {
    return res.data.review;
  });
};
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
export const deleteComment = (comment_id) => {
  return beGamesApi.delete(`/comments/${comment_id}`);
};
export const postComment = (newCommentText, user, review_id) => {
  const postBody = {
    username: user.username,
    body: newCommentText,
  };
  return beGamesApi
    .post(`/reviews/${review_id}/comments`, postBody)
    .then(({ data }) => {
      return data.comment;
    });
};
