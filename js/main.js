const getRandomInteger = (start, end) => {
  if (start >= 0 && end >= 0) {
    if (start > end) {
      return undefined;
    }
    if (start === end) {
      return start;
    }
    const randomInteger = start + Math.random() * (end + 1 - start);
    return Math.floor(randomInteger);
  }
  return undefined;
};

const checkCommentLength = (checkingString, stringLength) => {
  if (checkingString.length <= stringLength) {
    return true;
  } else {
    return false;
  }
};

getRandomInteger(1, 20);
checkCommentLength('Hello, world!', 10);
