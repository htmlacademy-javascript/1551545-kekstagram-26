import {returnDescriptionArray} from './data.js';

const COMMENTS_PER_LOAD = 5;

const mainBody = document.querySelector('body');
const picturesList = returnDescriptionArray();
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsCount = COMMENTS_PER_LOAD;
let initCommments = [];

const closeBigPicture = () => {
  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    mainBody.classList.remove('modal-open');

  });
};

const escapeBigPicture = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      mainBody.classList.remove('modal-open');
    }
  });
};

const renderComment = (comments) => {
  const commentCopy = commentTemplate.cloneNode(true);
  commentCopy.querySelector('.social__picture').src = comments.shift().avatar;
  commentCopy.querySelector('.social__picture').alt = comments.slice().shift().name;
  commentCopy.querySelector('.social__text').textContent = comments.shift().message;
  return commentCopy;
};

const createComments = (comments) => {
  const onCommentsLoaderClick = () => {
    createComments(comments);
  };

  commentsCount = (comments.length < COMMENTS_PER_LOAD) ? comments.length : commentsCount;
  initCommments = comments.slice(0, commentsCount);

  commentList.innerHTML = '';
  socialCommentCount.textContent = `${initCommments.length} из ${comments.length} комментариев`;

  const commentsFragment = document.createDocumentFragment();
  initCommments.forEach((photo) => {
    commentsFragment.append(renderComment(photo.comments));
  });
  commentList.appendChild(commentsFragment);

  if (comments.length > COMMENTS_PER_LOAD && initCommments.length < comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true });
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsCount += COMMENTS_PER_LOAD;
};

const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  bigPicture.querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  createComments(picturesList);
  closeBigPicture();
  escapeBigPicture();
};

export {showBigPicture};
