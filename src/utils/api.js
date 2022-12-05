import axios from "axios";

const backEndGames = axios.create({
  baseURL: "https://dead-pink-hare-garb.cyclic.app/api/",
});
export const getReviews = (review_id) => {
  return backEndGames.get("/reviews", { params: review_id }).then((res) => {
    return res.data.reviews;
  });
};
