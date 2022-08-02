import {returnDescriptionArray} from './data.js';

const mainBody = document.querySelector('body');
const picturesList = returnDescriptionArray();
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');

//Actions that need to be executed onClick
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');
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

const renderComment = (comments) => {
  const commentCopy = commentTemplate.cloneNode(true);
  commentCopy.querySelector('.social__picture').src = comments.shift().avatar;
  commentCopy.querySelector('.social__picture').alt = comments.shift().name;
  commentCopy.querySelector('.social__text').textContent = comments.shift().message;
  return commentCopy;
};

const createComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((photo) => {
    commentsFragment.appendChild(renderComment(photo.comments));
  });
  commentList.appendChild(commentsFragment);
};

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = picturesList.shift().url;
  bigPicture.querySelector('.likes-count').textContent = picturesList.shift().likes;
  bigPicture.querySelector('.comments-count').textContent = picturesList.shift().comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = picturesList.shift().description;
  bigPicture.querySelector('.social__comments').innerHTML = '';
  createComments(picturesList);

  closeBigPicture();
  escapeBigPicture();
};

showBigPicture();
