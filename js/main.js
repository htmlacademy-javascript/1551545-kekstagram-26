import {getRandomInteger} from './util.js';

const commentsCollection = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_COUNT = 25;
const commentAuthors = ['Красный страж', 'Сорвиголова', 'Бэтмен', 'Джокер', 'Оби-Ван Кеноби', 'Хоумлендер'];

const getFixedArray = () => {
  const generatedValues = [];
  while (generatedValues.length < COMMENTS_COUNT) {
    const value = getRandomInteger(1, COMMENTS_COUNT);
    if (!generatedValues.includes(value)) {
      generatedValues.push(value);
    }
  }
  return generatedValues;
};

const getArray = () => {
  const randomElements = [];
  while (randomElements.length < COMMENTS_COUNT) {
    const value = Math.floor(Math.random() * 100);
    if (!randomElements.includes(value)) {
      randomElements.push(value);
    }
  }
  return randomElements;
};

const createPhotoDescription = () => ({
  id: getFixedArray().shift(),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: 'Здесь должно быть описание, но вместо него вот это вот',
  likes: getRandomInteger(15, 200),
  comments: {
    id: getArray().shift(),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: commentsCollection[getRandomInteger(0, commentsCollection.length - 1)],
    name: commentAuthors[getRandomInteger(0, commentAuthors.length - 1)],
  }
});

const createDescriptionArray = Array.from({length: COMMENTS_COUNT}, createPhotoDescription);

const returnDescriptionArray = () => createDescriptionArray;

returnDescriptionArray();
