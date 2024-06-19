import { postComment, getComments } from "./comment.js";
/* eslint-disable no-return-assign */
const modal = async (data, index) => {
  let commentData = await getComments(index);
  if (commentData.length === undefined) {
    commentData = [];
  }
  const container = document.querySelector(".content");
  container.innerHTML = `
    <div class="modal-details">
      <img src="${data[index].image.original}" class="modal-img" />
      <h2 class="heading">${data[index].name}</h2>
      <p>${data[index].summary}</p>
    </div>
    <div class="comments">
      <div class="comment-details">
        <h2 class="heading">Comments<span>(${commentData.length})</span></h2>`;
  commentData.map(
    (comment) =>
      (container.innerHTML += `<div class="comment">
          <p class="comment-date">${comment.creation_date}</p>
          <p class="comment-msg">${comment.username} : &nbsp;${comment.comment}</p>
          </div>
          `)
  );
  container.innerHTML += `
          <div class="comment-form">
          <form>
            <input type="text" placeholder="Enter your name" />
            <textarea placeholder="Enter your comment here"></textarea>
            <button type="submit" class="btn flex">Submit your comment</button>
          </form>
          <i class='bx bx-x'></i>
        </div>`;
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("input").value;
    const commentMsg = document.querySelector("textarea").value;
    const commentData = {
      item_id: index.toString(),
      username: name,
      comment: commentMsg,
    };
    form.reset();
    if (commentData.username && commentData.comment) {
      postComment(commentData);
    }
    getComments(index);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
};

export default modal;
