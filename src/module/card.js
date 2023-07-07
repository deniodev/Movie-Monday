// eslint-disable-next-line import/no-cycle
import { requestLikes } from './getData.js';
import modal from './modal.js';
import { likeurl } from './url.js';

const card = (movies, data) => {
  const card = document.querySelector('.card-container');
  card.innerHTML = '';
  movies.forEach((movie, index) => {
    const id = data.findIndex((like) => +like.item_id === index);
    const msgLikes = id >= 0 ? data[id].likes : 0;
    const displayCard = `<div class="card" id="card">
        <img src="${movie.image.original}" class="card-img" alt="Show name"/>
        <div class="description">
          <span class="details">${movie.name}</span>
          <div class="likes">
          <i class="bx bx-heart" data-id="${index}"></i> 
          <span> ${msgLikes} </span> 
          </div>         
        </div>
        <button id="comments" data-id="${index}">Comments</button>
        `;
    card.innerHTML += displayCard;
  });

  const popUp = document.querySelectorAll('#comments');
  popUp.forEach((pop) => {
    pop.addEventListener('click', async (e) => {
      const modals = document.querySelector('.modal');
      const contents = document.querySelector('.content');
      modals.classList.remove('hidden');
      contents.classList.add('active');
      await modal(movies, e.target.dataset.id);
      const closeBtn = document.querySelector('.bx-x');
      closeBtn.addEventListener('click', () => {
        modals.classList.add('hidden');
        contents.classList.remove('active');
      });
    });
  });

  const likeBtn = document.querySelectorAll('.bx-heart');
  const url = likeurl;
  likeBtn.forEach((like) => {
    like.addEventListener('click', (e) => {
      requestLikes(url, e.target.dataset.id);
      like.classList.remove('bx-heart');
      like.classList.add('bxs-heart');
    });
  });
};
export default card;