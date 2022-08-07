import {returnDescriptionArray} from './data.js';
import {showBigPicture} from './pictures.js';

const userPictureList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userPictures = returnDescriptionArray();

userPictures.forEach((photo) => {
  const pictureElement = userPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length.toString();
  userPictureList.appendChild(pictureElement);

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  });
});
