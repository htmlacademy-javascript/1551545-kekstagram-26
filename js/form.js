const permittedSymbols = new RegExp('^#[a-zA-Zа-яА-ЯёЁ0-9]{0,19}$', 'i');

const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const formEdit = document.querySelector('.img-upload__overlay');
const closeEditorButton = formEdit.querySelector('.img-upload__cancel');
const mainBody = document.querySelector('body');
const hashTagsField = document.querySelector('.text__hashtags');

const editNewPhoto = () => {
  uploadFile.addEventListener('change', () => {
    formEdit.classList.remove('hidden');
    mainBody.classList.add('modal-open');
  });
};

const escapePhotoEditor = () => {
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      formEdit.classList.add('hidden');
      mainBody.classList.remove('modal-open');
      uploadFile.value = '';
    }
  });
};

const closePhotoEditor = () => {
  closeEditorButton.addEventListener('click', () => {
    formEdit.classList.add('hidden');
    mainBody.classList.remove('modal-open');
    uploadFile.value = '';
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text--error',
});


const getUsersHashtags = () =>  hashTagsField.value.trim().toLowerCase().split(' ');

const validateHash = () => {
  const inputTags = getUsersHashtags();

  //check for tags count
  if (inputTags.length > 5) {
    return false;
  }
  //check for tag length
  if (inputTags.some((tag) => tag.length > 20)) {
    return false;
  }
  //check for permitted symbols
  for (let i = 0; i < inputTags.length; i++) {
    if (!inputTags[i]) {
      continue;
    }
    if (!permittedSymbols.test(inputTags[i])) {
      return false;
    }
    //check for not texting only-hash
    if (inputTags[i] === '#') {
      return false;
    }
    //check for duplicate tag
    for (let j = i+1; j<inputTags.length; j++) {
      if (inputTags[i] === inputTags[j]) {
        return false;
      }
    }
  }
  return true;
};

const getErrorMessage = () => {
  const inputTags = getUsersHashtags();
  if (inputTags.length > 5) {
    return 'не более 5ти хэштегов';
  }
  if (inputTags.some((tag) => tag.length > 20)) {
    return 'хэштег должен быть не более 20ти символов длиной';
  }
  for (let i = 0; i < inputTags.length; i++) {
    if (!inputTags[i]) {
      continue;
    }
    if (!permittedSymbols.test(inputTags[i])) {
      return 'хэштеги должны начинаться с символа # и могут состоять из цифр и букв';
    }
    if (inputTags[i] === '#') {
      return 'хэштег не может состоять из одного символа #';
    }
    for (let j = i+1; j<inputTags.length; j++) {
      if (inputTags[i] === inputTags[j]) {
        return 'хэштеги не могут повторяться';
      }
    }
  }
};

pristine.addValidator(hashTagsField, validateHash, getErrorMessage);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});

const textContainer = document.querySelector('.img-upload__text');
textContainer.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.cancelBubble = true;
  }
});

editNewPhoto();
escapePhotoEditor();
closePhotoEditor();
