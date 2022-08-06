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

//Temporary app condition
mainBody.classList.add('modal-open');

const closeBigPicture = () => {
  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    mainBody.classList.remove('modal-open');
  }, {once: true});
};

const escapeBigPicture = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      mainBody.classList.remove('modal-open');
    }
  }, {once: true});
};

let commentsCount = COMMENTS_PER_LOAD;
let initCommments = [];

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

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = picturesList.shift().url;
  bigPicture.querySelector('.likes-count').textContent = picturesList.shift().likes;
  bigPicture.querySelector('.comments-count').textContent = picturesList.shift().comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = picturesList.shift().description;

  commentList.innerHTML = '';
  createComments(picturesList);
  closeBigPicture();
  escapeBigPicture();
};

showBigPicture();
