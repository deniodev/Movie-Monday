// eslint-disable-next-line import/no-cycle
import card from "./card.js";
import { cardapi, likeurl } from "./url.js";
import { itemCount } from "./itemCounter.js";

const shows = async () => {
  const response = await fetch(cardapi);
  const data = await response.json();
  const result = data.slice(161, 181);
  itemCount(result.length);
  const likes = await fetch(likeurl);
  const res = await likes.json();
  card(result, res);
};
const requestLikes = async (url, id) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  shows();
};
requestLikes();
export { shows, requestLikes };
